import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { IOrder } from 'modules/database/interfaces/order';

export class SaveValidator implements IOrder {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public userId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  @ApiProperty({ required: true, type: 'string', maxLength: 200 })
  public description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true, type: 'number' })
  public price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true, type: 'number' })
  public amount: number;
}
