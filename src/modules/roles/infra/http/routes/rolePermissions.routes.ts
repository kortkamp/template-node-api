import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { RolePermissionsController } from '../controllers/RolePermissionsController';
import {
  createRolePermissionValidate,
  deleteRolePermissionValidate,
  showRolePermissionValidate,
  updateRolePermissionValidate,
} from '../validations/rolePermissions.validation';

const rolePermissionsRoutes = Router();

rolePermissionsRoutes.use(authMiddleware);

const rolePermissionsController = new RolePermissionsController();

rolePermissionsRoutes.post(
  '/',
  createRolePermissionValidate,
  rolePermissionsController.create,
);

rolePermissionsRoutes.delete(
  '/:id',
  deleteRolePermissionValidate,
  rolePermissionsController.delete,
);

rolePermissionsRoutes.put(
  '/:id',
  updateRolePermissionValidate,
  rolePermissionsController.update,
);

rolePermissionsRoutes.get(
  '/:id',
  showRolePermissionValidate,
  rolePermissionsController.show,
);

rolePermissionsRoutes.get('/', rolePermissionsController.index);

export { rolePermissionsRoutes };
