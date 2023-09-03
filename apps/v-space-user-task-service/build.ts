import s from 'shelljs';

import config from './tsconfig.json';
const outdir = config.compilerOptions.outDir;

s.rm('-rf', outdir);
s.mkdir(outdir);
