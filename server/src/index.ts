import "reflect-metadata";
import express from "express";
import path from "path";
import "dotenv-safe/config";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { TestResolver } from "./resolvers/TestResolver";
import { UserResolver } from "./resolvers/UserResolver";
import connectRedis from "connect-redis";
import session from "express-session";
import Redis from "ioredis";
import http from "http";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { COOKIE_NAME, __prod__ } from "./constants";
import { BoardResolver } from "./resolvers/BoardResolver";
import { TaskListResolver } from "./resolvers/TaskListResolver";
import { TaskResolver } from "./resolvers/TaskResolver";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: !__prod__,
    logging: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [path.join(__dirname, "./entities/*")],
  });

  await conn.runMigrations();
  const app = express();
  const ws = http.createServer(app);

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  const pubSub = new RedisPubSub({
    publisher: new Redis(process.env.REDIS_URL),
    subscriber: new Redis(process.env.REDIS_URL),
  });

  app.set("trust proxy", 1);
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookies only work in https
        domain: __prod__ ? process.env.WEB_DOMAIN : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        BoardResolver,
        TaskListResolver,
        TaskResolver,
        TestResolver,
      ],
      pubSub: pubSub,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });
  apolloServer.installSubscriptionHandlers(ws);

  ws.listen(process.env.PORT, () => {
    console.log(`server started, listening at port ${process.env.PORT}`);
  });
};

main().catch((err) => {
  console.log(err);
});
