import {
  loginParamsSchema,
  loginSchema,
  errorSchema,
  userSchema,
  userParamsSchema,
  userResultSchema,
  userResultAllSchema,
} from './schemas/';

export default {
  error: errorSchema,
  loginParams: loginParamsSchema,
  login: loginSchema,
  user: userSchema,
  userParams: userParamsSchema,
  userResult: userResultSchema,
  userResultAll: userResultAllSchema,
};
