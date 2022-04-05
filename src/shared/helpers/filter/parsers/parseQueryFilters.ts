import { IFilterQuery } from '@shared/helpers/filter/typeorm/FilterBuilder';

interface IParserOptions {
  disablePagination: boolean;
}

export const parseQueryFilters = (
  query,
  options?: IParserOptions,
): IFilterQuery => {
  const default_per_page = options?.disablePagination ? undefined : 10;
  const default_page = options?.disablePagination ? undefined : 1;

  return {
    page: query.page ? Number(query.page) : default_page,
    per_page: query.per_page ? Number(query.per_page) : default_per_page,

    filterBy: query.filterBy
      ? (query.filterBy.split(',').map(item => item.trim()) as string[])
      : [],
    filterType: query.filterType
      ? (query.filterType.split(',').map(item => item.trim()) as string[])
      : [],
    filterValue: query.filterValue
      ? (query.filterValue.split(',').map(item => item.trim()) as string[])
      : [],

    orderBy: query.orderBy as string | undefined,
    orderType: query.orderType as 'ASC' | 'DESC' | undefined,
  };
};

interface IExtractFilterParams {
  query: IFilterQuery;
  field: string;
}

interface IExtractFilterResponse {
  filterBy: string;
  filterType: string;
  filterValue: string;
}
/* extractFilter
 A função extrai uma propriedade dos filtros da query
 e retorna um objeto {filterBy, filterType, filterValue}
 IMPORTANTE: a função altera o conteúdo da query
*/
export const extractFilter = ({
  query,
  field,
}: IExtractFilterParams): IExtractFilterResponse | Record<string, never> => {
  let filterBy: string;
  let filterType: string;
  let filterValue: string;
  for (let i = 0; i < query.filterBy.length; i += 1) {
    if (query.filterBy[i] === field) {
      filterValue = query.filterValue[i];
      filterBy = query.filterBy[i];
      filterType = query.filterType[i];
      query.filterBy.splice(i, 1);
      query.filterType.splice(i, 1);
      query.filterValue.splice(i, 1);
    }
  }
  return { filterBy, filterType, filterValue };
};
