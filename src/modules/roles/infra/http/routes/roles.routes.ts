import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { RolesController } from '../controllers/RolesController';
import {
  createRoleValidate,
  deleteRoleValidate,
  showRoleValidate,
  updateRoleValidate,
} from '../validations/roles.validation';

const rolesRoutes = Router();

rolesRoutes.use(authMiddleware);

const rolesController = new RolesController();

rolesRoutes.post('/', createRoleValidate, rolesController.create);

rolesRoutes.get('/', rolesController.index);

rolesRoutes.delete('/:id', deleteRoleValidate, rolesController.delete);

rolesRoutes.put('/:id', updateRoleValidate, rolesController.update);

rolesRoutes.get('/:id', showRoleValidate, rolesController.show);

export { rolesRoutes };
