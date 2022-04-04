interface IListResultInterface {
  result: object[];
  total_registers: number;
  total_filtered: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export { IListResultInterface };
