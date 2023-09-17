import { ExampleRepository } from '@datasource/postgresql';

import { ExampleFromEntityDTO } from './dto/example.response.dto';
import { CreateExamplePayload, Example } from './interface/example';

export class ExampleService {
    async createExample({ name }: CreateExamplePayload): Promise<Example> {
        const example = ExampleRepository.create({
            name,
        });

        const exampleEntity = await ExampleRepository.save(example);

        return ExampleFromEntityDTO.toClass(exampleEntity);
    }

    async getById(id: string): Promise<Example> {
        const example = await ExampleRepository.findById(id);
        return ExampleFromEntityDTO.toClass(example);
    }
}