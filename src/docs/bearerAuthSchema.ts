export const bearerAuthSchema = {
  type: 'http',
  description: 'Enter JWT Bearer Token **_only_**',
  scheme: 'bearer',
  bearerFormat: 'JWT',
};
