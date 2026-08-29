import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator'

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    @MaxLength(100)
    title?: string;
    @IsString()
    @IsOptional()
    @MaxLength(500)
    description?: string;
}
