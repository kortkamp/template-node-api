import { celebrate, Joi, Segments } from 'celebrate';

export const createSessionValidate = celebrate(
  {
    [Segments.BODY]: {
      email: Joi.string().email().trim().lowercase().required(),
      password: Joi.string().required(),
    },
  },
  {
    abortEarly: false,
  },
);
