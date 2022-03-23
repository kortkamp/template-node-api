import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { RolePermissionsController } from '../controllers/RolePermissionsController';
import { createRolePermissionValidate } from '../validations/rolePermissions.validation';

const rolePermissionsRoutes = Router();

rolePermissionsRoutes.use(authMiddleware);

const rolePermissionsController = new RolePermissionsController();

rolePermissionsRoutes.post(
  '/',
  createRolePermissionValidate,
  rolePermissionsController.create,
);

rolePermissionsRoutes.get('/', rolePermissionsController.index);

export { rolePermissionsRoutes };
