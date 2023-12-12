import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

export const client = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT ?? '6379', 10)
    }
});
client.on('error', err => console.log('Redis Client Error', err));
client.connect().then(() => {
    console.log("Redis connected")
    
  });