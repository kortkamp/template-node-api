import { rolePermissionsRoutes } from '@modules/roles/infra/http/routes/rolePermissions.routes';
import { rolesRoutes } from '@modules/roles/infra/http/routes/roles.routes';
import { sessionsRoutes } from '@modules/sessions/infra/http/routes/sessions.routes';
import { usersRoutes } from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/roles', rolesRoutes);
routes.use('/role-permissions', rolePermissionsRoutes);

export { routes };
