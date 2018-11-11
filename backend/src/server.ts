import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";

import { useContainer as useContainerTypeGraphQL } from "type-graphql";
import { createConnection, useContainer as useContainerTypeOrm } from "typeorm";

import { ApolloServer } from "apollo-server";
import * as path from "path";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import Cat from "./entities/Cat";
import User from "./entities/User";
import CatResolver from "./resolvers/cat-resolver";
import UserResolver from "./resolvers/user-resolver";

const { DB_PASS } =
  process.env || "You need to enter your password in a .env file";

useContainerTypeGraphQL(Container);
useContainerTypeOrm(Container);

async function bootstrap() {
  try {
    await createConnection({
      type: "postgres",
      database: "postgres",
      username: "postgres",
      password: DB_PASS,
      port: 5433,
      host: "localhost",
      entities: [Cat, User],
      synchronize: true,
      logger: "advanced-console",
      logging: "all",
      dropSchema: true,
      cache: true
    });

    const schema = await buildSchema({
      resolvers: [CatResolver, UserResolver],
      emitSchemaFile: path.resolve(__dirname, "schema.gql")
    });

    const server = new ApolloServer({
      schema,
      playground: true
    });

    const { url } = await server.listen(4000);
    console.log(`Server is running, playground available at ${url}`);
  } catch (err) {
    console.log(err);
  }
}

bootstrap();
