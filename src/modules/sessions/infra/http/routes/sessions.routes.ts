import { Router } from 'express';

import { SessionsController } from '../controllers/SessionsController';
import { createSessionValidate } from '../validations/sessions.validation';

const sessionsRoutes = Router();

const sessionsController = new SessionsController();

sessionsRoutes.post('/', createSessionValidate, sessionsController.create);

export { sessionsRoutes };
