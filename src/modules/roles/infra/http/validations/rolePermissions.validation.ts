import { celebrate, Joi, Segments } from 'celebrate';

export const createRolePermissionValidate = celebrate(
  {
    [Segments.BODY]: {
      resource: Joi.string().min(3).max(100).required(),
      role_id: Joi.string().uuid().required(),
      list: Joi.boolean().required(),
      create: Joi.boolean().required(),
      read: Joi.boolean().required(),
      update: Joi.boolean().required(),
      delete: Joi.boolean().required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const deleteRolePermissionValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const showRolePermissionValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const updateRolePermissionValidate = celebrate(
  {
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      resource: Joi.string().min(3).max(100),
      role_id: Joi.string().uuid(),
      list: Joi.boolean(),
      create: Joi.boolean(),
      read: Joi.boolean(),
      update: Joi.boolean(),
      delete: Joi.boolean(),
    },
  },
  {
    abortEarly: false,
  },
);
