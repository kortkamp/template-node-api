import {
  loginParamsSchema,
  loginSchema,
  errorSchema,
  userSchema,
  userParamsSchema,
  userResultSchema,
  userResultAllSchema,
  roleSchema,
  roleParamsSchema,
  roleResultSchema,
  roleResultAllSchema,
} from './schemas/';

export default {
  error: errorSchema,
  loginParams: loginParamsSchema,
  login: loginSchema,
  user: userSchema,
  userParams: userParamsSchema,
  userResult: userResultSchema,
  userResultAll: userResultAllSchema,
  role: roleSchema,
  roleParams: roleParamsSchema,
  roleResult: roleResultSchema,
  roleResultAll: roleResultAllSchema,
};
