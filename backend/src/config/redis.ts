import { createClient, RedisClientType } from "redis";

const client: RedisClientType = createClient({
  socket: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: Number(process.env.REDIS_PORT) || 6379,
  },
});

client
  .connect()
  .then(() => console.log("Redis connected successfully."))
  .catch((err) => console.error("Redis connection error:", err));

  
export default client;