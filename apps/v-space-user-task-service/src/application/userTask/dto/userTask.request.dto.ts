import {
	IsDateString,
	IsOptional,
	IsString,
	MaxLength,
} from '@v-libs/node-infrastructure';

import { UpdateUserTaskPayload, UserTask } from '../interface/userTask';

export class CreateUserTaskRequestBodySchema implements Partial<UserTask> {
	@IsString()
	@MaxLength(50)
	title: string;

	@IsString()
	@MaxLength(255)
	@IsOptional()
	description: string;

	@IsDateString()
	startTime: string;

	@IsDateString()
	@IsOptional()
	endTime: string;
}

export class UpdateUserTaskRequestBodySchema implements Partial<UpdateUserTaskPayload>{
	@IsString()
	@MaxLength(50)
	@IsOptional()
	title?: string;

	@IsString()
	@MaxLength(255)
	@IsOptional()
	description: string;

	@IsDateString()
	@IsOptional()
	startTime: string;

	@IsDateString()
	@IsOptional()
	endTime: string;
}