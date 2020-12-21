import "reflect-metadata";
import express from "express";
import path from "path";
import "dotenv-safe/config";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { TestResolver } from "./resolvers/TestResolver";
import { UserResolver } from "./resolvers/UserResolver";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [path.join(__dirname, "./entities/*")],
  });

  await conn.runMigrations();
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, TestResolver],
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(process.env.PORT, () => {
    console.log(`server started, listening at port ${process.env.PORT}`);
  });
};

main().catch((err) => {
  console.log(err);
});
