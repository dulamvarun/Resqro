import { createClient } from 'redis';

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || '6379';

export const pubClient = createClient({ url: `redis://${redisHost}:${redisPort}` });
export const subClient = pubClient.duplicate();

export async function initRedis() {
  await pubClient.connect();
  await subClient.connect();
  console.log('Redis connected successfully');
}
