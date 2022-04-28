import {
  badRequest,
  serverError,
  notFound,
  unauthorized,
  forbidden,
} from './components/index';
import { bearerAuthSchema } from './schemas/bearerAuthSchema';

export default {
  securitySchemes: {
    bearerAuth: bearerAuthSchema,
  },
  badRequest,
  serverError,
  notFound,
  unauthorized,
  forbidden,
};
