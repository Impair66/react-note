import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    if (times > 3) {
      console.error("[Redis] 连接失败，已达最大重试次数");
      return null;
    }
    return Math.min(times * 200, 2000);
  },
  lazyConnect: true,
});

redis.on("error", (err) => {
  console.error("[Redis] 连接错误:", err.message);
});

const initialData = {
  1702459181837:
    '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  1702459182837:
    '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  1702459188837:
    '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}',
};

async function ensureConnection() {
  try {
    if (redis.status === "wait" || redis.status === "end") {
      await redis.connect();
    }
  } catch {
    console.error("[Redis] 无法连接，请确保 Redis 服务已启动");
    throw new Error("Redis 连接失败");
  }
}

export async function getAllNotes() {
  await ensureConnection();
  const data = await redis.hgetall("notes");
  if (Object.keys(data).length === 0) {
    await redis.hset("notes", initialData);
  }
  return await redis.hgetall("notes");
}

export async function addNote(data) {
  await ensureConnection();
  const uuid = Date.now().toString();
  await redis.hset("notes", [uuid], data);
  return uuid;
}

export async function updateNote(uuid, data) {
  await ensureConnection();
  await redis.hset("notes", [uuid], data);
}

export async function getNote(uuid) {
  await ensureConnection();
  const raw = await redis.hget("notes", uuid);
  return raw ? JSON.parse(raw) : null;
}

export async function delNote(uuid) {
  await ensureConnection();
  return redis.hdel("notes", uuid);
}

export default redis;
