import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class YearPipe implements PipeTransform {
  /**
   *
   * @param year
   * @returns the year if the same is greater than 2000
   */
  transform(year: number, _metadata: ArgumentMetadata) {
    console.log(year);
    if (year < 1900) {
      throw new BadRequestException('Year must to be greater than 1900.');
    }
    return year;
  }
}
