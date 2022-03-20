interface IErrorLog {
  id: string;

  route: string;

  userId: string;

  requestMethod: string;

  requestQuery: Record<string, unknown>;

  requestBody: Record<string, unknown>;

  responseCode: number;

  responseMessage: Record<string, unknown>;

  createdAt: Date;
}

export { IErrorLog };
