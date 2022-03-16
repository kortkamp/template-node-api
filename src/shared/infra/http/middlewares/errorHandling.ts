import { isCelebrateError, errors } from 'celebrate';
import { Request, Response, NextFunction } from 'express';

import ErrorsApp from '@shared/errors/ErrorsApp';

const errorHandling = async (
  err: Error | any,
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> => {
  console.log(err);

  if (err instanceof ErrorsApp) {
    return response
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }

  if (isCelebrateError(err)) {
    errors()(err, request, response, next);
    return response;
  }

  return response.status(500).json({
    success: false,
    message: 'Internal server error.',
  });
};

export default errorHandling;
