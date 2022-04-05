import { Request, Response, NextFunction } from 'express';

import ErrorsApp from '@shared/errors/ErrorsApp';

function ensureRoles(authorizedRoles: string[]) {
  return async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { role } = request.user;

    const isRoleAuthorized = authorizedRoles.includes(role);

    if (!isRoleAuthorized) {
      throw new ErrorsApp('User forbidden to access that resource', 403);
    }
    return next();
  };
}

export { ensureRoles };
