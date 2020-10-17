import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const handleResponseSuccess = (res: Response, code: StatusCodes, value: any) => {
  res.status(code).json({
    message: 'success',
    response: value,
  });
};

export const handleResponseError = (res: Response, code: StatusCodes, value: any) => {
  res.status(code).json({
    message: 'fail',
    response: value,
  });
};

export const UPDATE_ERROR: string = 'missing the "id" field on the body or "id" not the same.';
