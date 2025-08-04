import { IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from "class-transformer";

export class TimerResponseDto {
  @ApiProperty({ description: 'Unique identifier for the timer' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'User ID associated with the timer' })
  @IsNumber()
  user_id: number;

  @ApiProperty({ description: 'Start time of the timer' })
  @Expose()
  started_at: Date;

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
  state: 'running' | 'paused' | 'stopped';
}
