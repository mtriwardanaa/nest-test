import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization)
      throw new HttpException('No Authorization Token', HttpStatus.FORBIDDEN);

    if (authorization === '123123123asdfasdf') next();
    else throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN);
  }
}
