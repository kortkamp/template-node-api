import { celebrate, Joi, Segments } from 'celebrate';

export const createUserValidate = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      email: Joi.string().email().trim().lowercase().required(),
      password: Joi.string().required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const confirmUserValidate = celebrate({
  [Segments.QUERY]: {
    token: Joi.string().uuid().required(),
  },
});

export const forgotPasswordValidate = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().trim().required(),
  },
});

export const resetPasswordValidate = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().trim().required(),
    token: Joi.string().uuid().required(),
  },
});

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
