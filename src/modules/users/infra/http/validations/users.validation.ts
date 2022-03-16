import { celebrate, Joi, Segments } from 'celebrate';

export const createUserValidate = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      email: Joi.string().email().trim().lowercase().required(),
      password: Joi.string().required(),
      active: Joi.boolean().required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const deleteUserValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const showUserValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});
