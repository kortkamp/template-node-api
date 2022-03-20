import { CreateErrorLogService } from '@modules/logs/services/CreateErrorLogService';
import { isCelebrateError, errors } from 'celebrate';
import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

const errorHandling = async (
  err: Error | any,
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> => {
  if (process.env.NODE_ENV === 'development') {
    console.log(err);
  }
  const createLog = container.resolve(CreateErrorLogService);

  await createLog.execute({
    route: request.originalUrl,
    userId: request.user?.id,
    requestMethod: request.method,
    requestBody: request.body,
    requestQuery: request.query,
    responseCode: err.statusCode || 500,
    responseMessage: {
      success: false,
      message: err.message || '',
      error: err,
    },
  });

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
