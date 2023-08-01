import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class MonthPipe implements PipeTransform {
  /**
   *
   * @param month
   * @returns the month if the same is greater than 12
   */
  transform(month: number, _metadata: ArgumentMetadata) {
    if (month > 12) {
      throw new BadRequestException(
        'Month must to be greater or equal than 12.',
      );
    }
    return month;
  }
}
