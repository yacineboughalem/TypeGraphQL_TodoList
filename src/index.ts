import "reflect-metadata";

import express, { Express } from "express";

import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql";
import { TaskResolver } from "./resolvers/task";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { createConnection } from "typeorm";
import { Task } from "./entities/task";

const main = async () => {

  const conn = await createConnection({
    type: "postgres",
    database: "todolist",
    entities: [Task],
    logging: true,
    synchronize: true,
    username: "postgres",
    password: "postgres",
    port: "5432"
  })


  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TaskResolver],
      validate: false
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground]
  });

  await apolloServer.start();

  const app: Express = express();

  apolloServer.applyMiddleware({ app })

  app.get('/', (_req, res) => res.send("HEllo frontYnova"));

  const PORT = process.env.PORT || 8000;

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

}

main().catch((err) => console.log(err));