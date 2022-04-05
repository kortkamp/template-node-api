import { celebrate, Joi, Segments } from 'celebrate';
import { NextFunction, Request, Response } from 'express';

import ErrorsApp from '@shared/errors/ErrorsApp';

// import { FilterTypes } from '../typeorm/FilterBuilder/WhereBuilder';

export const listWithFilterSchema = Joi.object({
  page: Joi.number().positive(),
  per_page: Joi.number().positive(),

  filterBy: Joi.string(),
  filterType: Joi.string(),
  filterValue: Joi.string(),

  orderType: Joi.string().valid('ASC', 'DESC'),
  orderBy: Joi.string().when('orderType', {
    is: Joi.exist(),
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
}).and('filterBy', 'filterType', 'filterValue');

export const validateSchema = celebrate({
  [Segments.QUERY]: listWithFilterSchema,
});

export async function filtersQueryValidate(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { filterBy, filterType, filterValue } = request.query;

  const filtersNumber = (filterBy as string)?.split(',').length;
  if ((filterType as string)?.split(',').length !== filtersNumber) {
    throw new ErrorsApp(
      'The number of fields filterBy and filterType did not match',
      400,
    );
  }
  if ((filterValue as string)?.split(',').length !== filtersNumber) {
    throw new ErrorsApp(
      'The number of fields filterBy and filterValue did not match',
      400,
    );
  }
  validateSchema(request, response, next);
}
