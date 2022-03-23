import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { RolesController } from '../controllers/RolesController';
import { createRoleValidate } from '../validations/roles.validation';

const rolesRoutes = Router();

rolesRoutes.use(authMiddleware);

const rolesController = new RolesController();

rolesRoutes.post('/', createRoleValidate, rolesController.create);

export { rolesRoutes };
