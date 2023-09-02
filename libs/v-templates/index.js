#!/usr/bin/env node

const fs = require('fs');
const { green } = require('kolorist');
const { reset, red, lightCyan } = require('kolorist');
const path = require('path');
const prompts = require('prompts');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const commandExistsSync = require('command-exists').sync;

const cwd = process.cwd();
const argv = require('minimist')(process.argv.slice(2), { string: ['_'] });

const TEMPLATE_VARIANTS = {
    project: {
        require: {
            packageName: true,
        },
    },
    package: {
        require: {
            packageName: true,
            description: false,
            license: false,
        },
        default: {
            pkgManager: 'npm',
        },
    },
};

const TEMPLATES = [
    {
        name: 'node-ts',
        type: 'project',
    },
    {
        name: 'ts-lib',
        type: 'package',
    },
];

const renameFiles = {
    _gitignore: '.gitignore',
};

const validateNPMPackageName = packageName =>
    /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
        packageName
    );

const convertToValidPackageName = projectName => {
    return projectName
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/^[._]/, '')
        .replace(/[^a-z0-9-~]+/g, '-');
};

function emptyDir(dir) {
    if (!fs.existsSync(dir)) {
        return;
    }
    for (const file of fs.readdirSync(dir)) {
        const abs = path.resolve(dir, file);
        if (fs.lstatSync(abs).isDirectory()) {
            emptyDir(abs);
            fs.rmdirSync(abs);
        } else {
            fs.unlinkSync(abs);
        }
    }
}

function copy(src, dest) {
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
        copyDir(src, dest);
    } else {
        fs.copyFileSync(src, dest);
    }
}

function copyDir(srcDir, destDir) {
    fs.mkdirSync(destDir, { recursive: true });
    for (const file of fs.readdirSync(srcDir)) {
        const srcFile = path.resolve(srcDir, file);
        const destFile = path.resolve(destDir, file);
        copy(srcFile, destFile);
    }
}

async function start() {
    let targetDir = argv._[0];
    let template = argv.template || argv.t;
    let description = argv.desc;
    let license = argv.license;

    const templateObject = TEMPLATES.find(({ name }) => name === template);

    if (!templateObject) {
        throw new Error('Unsupported template');
    }

    const defaultProjectName = !targetDir ? 'v-app' : targetDir;
    const templateOptions = TEMPLATE_VARIANTS[templateObject.type];

    let result = {};

    try {
        result = await prompts(
            [
                {
                    type:
                        templateOptions.require.packageName && !targetDir ? 'text' : null,
                    name: 'projectName',
                    message: reset('Project name:'),
                    initial: defaultProjectName,
                    onState: state =>
                        (targetDir = state.value.trim() || defaultProjectName),
                },
                {
                    type: validateNPMPackageName(targetDir) ? null : 'text',
                    name: 'packageName',
                    message: reset('Package name:'),
                    initial: () => {
                        return convertToValidPackageName(targetDir);
                    },
                    validate: name =>
                        validateNPMPackageName(name) || 'Invalid package name',
                },
                {
                    type:
                        templateOptions.require.description != null && !description
                            ? 'text'
                            : null,
                    name: 'description',
                    message: reset('Description:'),
                    initial: description,
                    onState: state => (description = state.value),
                },
                {
                    type:
                        templateOptions.require.description != null && !description
                            ? 'text'
                            : null,
                    name: 'license',
                    message: reset('License:'),
                    initial: description,
                    onState: state => (license = state.value),
                },
            ],
            {
                onCancel: () => {
                    throw new Error(red('*') + 'Something is wrong');
                },
            }
        );

        if (!result.packageName) {
            result.packageName = targetDir;
        }

        const absoluteDir = path.join(cwd, targetDir);

        if (fs.existsSync(absoluteDir)) {
            throw new Error(red('*') + ` Folder isn't empty`);
            // emptyDir(absoluteDir);
        } else {
            fs.mkdirSync(absoluteDir);
        }

        const { packageName } = result;
        const templateDir = path.join(__dirname, `template-${template}`);

        const files = fs.readdirSync(templateDir);

        const writeFile = (file, content) => {
            const targetPath = renameFiles[file]
                ? path.join(absoluteDir, renameFiles[file])
                : path.join(absoluteDir, file);
            if (content) {
                fs.writeFileSync(targetPath, content);
            } else {
                copy(path.join(templateDir, file), targetPath);
            }
        };

        for (const file of files.filter(f => f !== 'package.json')) {
            writeFile(file);
        }

        const pkgJson = require(path.join(templateDir, `package.json`));
        if (pkgJson) {
            pkgJson.name = packageName;
            if (license) {
                pkgJson.license = license;
            }

            if (description) {
                pkgJson.description = description;
            }

            writeFile('package.json', JSON.stringify(pkgJson, null, 2));

            console.log(`${lightCyan('Installing packages...')}`);
            const pkgManager =
                argv.pkgManager ||
                templateOptions.default?.pkgManager ||
                (commandExistsSync('pnpm') && 'pnpm') ||
                (commandExistsSync('yarn') && 'yarn') ||
                'npm';

            if (pkgManager === 'yarn') {
                await exec(`${pkgManager} --cwd ${absoluteDir}`);
            } else {
                await exec(`${pkgManager} i --prefix ${absoluteDir}`);
            }

            console.log(`${green('All done. Congrats!')}`);
        }
    } catch (error) {
        throw Promise.reject(error);
    }
}

start().catch(e => {
    console.error(e);
});