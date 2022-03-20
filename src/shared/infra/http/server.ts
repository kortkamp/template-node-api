import { server } from './app';

const port = process.env.APP_PORT;

server.on('database-ready', () => {
  server.listen(port, () => {
    console.log(`Api started on localhost:${port}! 🚀`);
  });
});
