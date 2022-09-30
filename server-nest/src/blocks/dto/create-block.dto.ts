import { IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator';

/**
 * The TS not null assertion operator is used as these are supposed to be validation
 * DTO classes and do not need to be initialized by the user.
 */
export class CreateBlockDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['SOP', 'CKB'])
  type!: string;

  @IsOptional()
  @IsString()
  parent?: string;

  @IsNotEmpty()
  properties!: object;
}
