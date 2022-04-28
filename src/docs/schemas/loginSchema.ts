import { userSchema } from './userSchema';

export const loginSchema = {
  type: 'object',
  properties: {
    user: {
      $ref: '#/schemas/user',
    },

    token: {
      type: 'string',
    },
  },
  example: {
    user: {
      id: '0e817215-3af4-4e09-8951-9918f5c34f2e',
      email: 'admin@template.com',
      name: 'Admin',
      role_id: '5fe4f56a-dbc9-41f7-bc71-6b28ec18aa54',
      active: true,
      avatar:
        '368411ebbfd838786cca-png-clipart-raised-fist-graphy-fist-miscellaneous-photography-thumbnail.png',
      created_at: '2022-03-24T17:36:47.880Z',
      updated_at: '2022-04-14T16:43:59.712Z',
    },
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTEwNzUwNDIsImV4cCI6MTY1MzY2NzA0Miwic3ViIjoiMGU4MTcyMTUtM2FmNC00ZTA5LTg5NTEtOTkxOGY1YzM0ZjJlIn0.98100Jw5YFS_R04dockS_xXvTjYoziElErz_slF2GIA',
  },
  required: ['email', 'senha'],
};
