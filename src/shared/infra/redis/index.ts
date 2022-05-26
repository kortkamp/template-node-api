import redis from 'redis';

const redisClient = redis.createClient({
  host:
    process.env.ENVIRONMENT === 'test' ? 'localhost' : process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

if (process.env.ENVIRONMENT === 'dist') {
  redisClient.auth(process.env.REDIS_PASSWORD);
}

export { redisClient };
