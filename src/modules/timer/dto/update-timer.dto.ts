import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTimerDto {
  @ApiProperty({ description: 'Time when the timer was paused' })
  @Expose()
  @IsOptional()
  paused_at?: Date;

  @ApiProperty({ description: 'Time when the timer was resumed' })
  @Expose()
  @IsOptional()
  resumed_at?: Date;

  @ApiProperty({ description: 'Time when the timer was stopped' })
  @Expose()
  @IsOptional()
  stopped_at?: Date;

  @ApiProperty({ description: 'Total duration of the timer in seconds' })
  @IsNumber()
  @IsOptional()
  duration?: number;

  @ApiProperty({ description: 'Total time paused in seconds' })
  @IsNumber()
  @IsOptional()
  total_paused?: number;

  @ApiProperty({ description: 'Current state of the timer' })
  @IsString()
  state?: 'running' | 'paused' | 'stopped';
}
