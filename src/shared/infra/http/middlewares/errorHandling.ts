import { isCelebrateError, errors } from 'celebrate';
import { Request, Response, NextFunction } from 'express';

import ErrorsApp from '@shared/errors/ErrorsApp';
import { logger } from '@shared/utils/logger';

const errorHandling = async (
  err: Error | any,
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> => {
  delete request.body?.password;

  const data = {
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
  };

  if (err instanceof ErrorsApp) {
    logger.warn(data);
    return response
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }

  if (isCelebrateError(err)) {
    logger.warn(data);
    errors()(err, request, response, next);
    return response;
  }

  logger.error(data);

  return response.status(500).json({
    success: false,
    message: 'Internal server error.',
  });
};

export default errorHandling;
