import { celebrate, Joi, Segments } from 'celebrate';

export const createRoleValidate = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      usersPermissions: Joi.number().integer(),
      rolesPermissions: Joi.number().integer(),
    },
  },
  {
    abortEarly: false,
  },
);
