import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

import { DEFAULT_VALIDATION_OPTIONS } from '../../../commons/dto/default-validation-options';

@JoiSchemaOptions(DEFAULT_VALIDATION_OPTIONS)
export class SignInDto {
  @ApiProperty({ type: String })
  @JoiSchema(Joi.string().email().required())
  email!: string;

  @ApiProperty({ type: String })
  @JoiSchema(Joi.string().required())
  password!: string;
}
