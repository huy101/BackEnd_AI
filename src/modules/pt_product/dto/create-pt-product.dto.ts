import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePtProductDto {
  @ApiProperty({ example: 'Laptop Dell XPS 15' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1999.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'High performance laptop' })
  @IsOptional()
  @IsString()
  description?: string;
}
