import {
  IsDateString,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class CreateActivityDto {
  @IsDateString()
  date: string;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'time must use HH:mm format',
  })
  time: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}