import components from './components';
import paths from './paths';
import schemas from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Template API',
    version: '1.0.0',
  },
  servers: [
    {
      url: '/',
      description: 'Main server',
    },
  ],
  tags: [
    {
      name: 'Sessions',
      description: 'Login related module',
    },
    {
      name: 'Users',
      description: 'Users related module',
    },
    {
      name: 'Roles',
      description: 'Roles related module',
    },
  ],
  paths,
  schemas,
  components,
};
