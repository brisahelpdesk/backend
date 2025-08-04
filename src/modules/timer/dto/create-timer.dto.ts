import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber } from "class-validator";

export class CreateTimerDto {
  @ApiProperty({ description: 'User ID associated with the timer' })
  @IsNumber()
  user_id: number;

  @ApiProperty({ description: 'Start time of the timer' })
  @Expose()
  started_at: Date;
}

