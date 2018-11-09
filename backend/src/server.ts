import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";

const schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    hello: String
    random: Float!
    getDie(numSides: Int): RandomDie
  }
`);

class RandomDie {
  numSides: number;

  constructor(numSides: number) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({ numRolls }: { numRolls: number }) {
    const output = [];
    for (let i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

const root = {
  hello: () => "hello",
  random: () => Math.random(),
  getDie({ numSides }: { numSides?: number }) {
    return new RandomDie(numSides || 6);
  }
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");
