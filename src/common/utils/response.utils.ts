import { Response } from 'express';

export class Result<T> {
  success(res: Response, code: number = 200, message: string = 'Success', data?: T) {
    return res.status(code).json({
      code,
      message,
      data,
    });
  }

  error(res: Response, code: number = 500, message: string = 'Something went wrong', data?: T) {
    return res.status(code).json({
      code,
      message,
      data,
    });
  }
}
