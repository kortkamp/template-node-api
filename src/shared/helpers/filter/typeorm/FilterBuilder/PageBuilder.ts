import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

// import ErrorsApp from '@shared/errors/ErrorsApp';

export interface IPage {
  page: number;
  per_page: number;
}

export default class PageBuilder<Entity> {
  constructor(
    private readonly queryBuilder: SelectQueryBuilder<Entity>,
    private pagination?: IPage,
  ) {}

  build(): void {
    if (!this.pagination.per_page) {
      return;
    }

    this.queryBuilder.take(this.pagination.per_page);
    this.queryBuilder.skip(
      (this.pagination.page - 1) * this.pagination.per_page,
    );
  }
}
