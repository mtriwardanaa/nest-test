import { CreateUserDto } from './../dtos/CreateUser.dto';
import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    const parseAgeInt = parseInt(value.age.toString());
    if (isNaN(parseAgeInt)) {
      throw new HttpException(
        'Invalid data  type for property age, excepted number',
        HttpStatus.BAD_REQUEST,
      );
    }

    return { ...value, age: parseAgeInt };
  }
}
