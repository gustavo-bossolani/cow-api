import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { PaginatorOptionsDto } from 'src/shared/components/pagination/paginator-options.dto';

class ParseToNumber implements PipeTransform {
  transform(
    value: PaginatorOptionsDto,
    _metadata: ArgumentMetadata,
  ): PaginatorOptionsDto {
    Object.keys(value).forEach((key) => (value[key] = parseInt(value[key])));
    return value;
  }
}

export { ParseToNumber };
