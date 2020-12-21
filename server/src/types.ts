import { Redis } from "ioredis";
import session from "express-session";

export interface MyContext {
  req: Request & { session: session.Session & { userId: number } };
  redis: Redis;
  res: Response;
}
