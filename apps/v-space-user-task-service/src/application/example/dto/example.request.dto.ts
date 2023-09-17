import { IsString } from "@v-libs/node-infrastructure";
import { CreateExamplePayload } from "../interface/example";

export class CreateExampleRequestBodySchema implements Partial<CreateExamplePayload>{
    @IsString()
    name: string;
}