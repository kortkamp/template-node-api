import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { RolesRepository } from '../../typeorm/repositories/RolesRepository';

enum fnMethods {
  GET = 'read',
  DELETE = 'delete',
  PUT = 'update',
  POST = 'create',
}
function ensurePermission(resource: string) {
  return async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    const rolesRepository = container.resolve(RolesRepository);

    const { method, user } = request;

    const role = await rolesRepository.findById(user.role, ['permissions']);

    if (!role) {
      throw new ErrorsApp('User role not found', 401);
    }

    const permission = role.permissions.find(
      item => item.resource === resource,
    );

    if (permission?.[fnMethods[method]]) {
      return next();
    }

    throw new ErrorsApp(`Not authorized to ${method} on ${resource}`, 403);
  };
}

export { ensurePermission };
