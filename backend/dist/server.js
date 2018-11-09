"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_graphql_1 = __importDefault(require("express-graphql"));
var graphql_1 = require("graphql");
var schema = graphql_1.buildSchema("\n  type RandomDie {\n    numSides: Int!\n    rollOnce: Int!\n    roll(numRolls: Int!): [Int]\n  }\n\n  type Query {\n    hello: String\n    random: Float!\n    getDie(numSides: Int): RandomDie\n  }\n");
var RandomDie = /** @class */ (function () {
    function RandomDie(numSides) {
        this.numSides = numSides;
    }
    RandomDie.prototype.rollOnce = function () {
        return 1 + Math.floor(Math.random() * this.numSides);
    };
    RandomDie.prototype.roll = function (_a) {
        var numRolls = _a.numRolls;
        var output = [];
        for (var i = 0; i < numRolls; i++) {
            output.push(this.rollOnce());
        }
        return output;
    };
    return RandomDie;
}());
var root = {
    hello: function () { return "hello"; },
    random: function () { return Math.random(); },
    getDie: function (_a) {
        var numSides = _a.numSides;
        return new RandomDie(numSides || 6);
    }
};
var app = express_1.default();
app.use("/graphql", express_graphql_1.default({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");
