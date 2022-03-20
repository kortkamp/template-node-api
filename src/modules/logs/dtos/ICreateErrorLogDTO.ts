interface ICreateErrorLogDTO {
  route: string;
  userId?: string;
  requestMethod: string;
  requestQuery: Record<string, unknown>;
  requestBody: Record<string, unknown>;
  responseCode: number;
  responseMessage: Record<string, unknown>;
}

export { ICreateErrorLogDTO };
