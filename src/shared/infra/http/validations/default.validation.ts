import { celebrate, Joi, Segments } from 'celebrate';

export const paramsIdValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});
