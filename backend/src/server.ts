import "reflect-metadata";

import { ApolloServer } from "apollo-server";
import * as path from "path";
import { buildSchema } from "type-graphql";
import RandomDieResolver from "./DieResolver";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [RandomDieResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql")
  });

  const server = new ApolloServer({
    schema,
    playground: true
  });

  const { url } = await server.listen(4000);
  console.log(`Server is running, playground available at ${url}`);
}

bootstrap();
