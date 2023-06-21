const { GraphQLSchema } = require("graphql");

// Queries
const query = require("./queries/index");

// Mutations
const mutation = require("./mutations/index");

module.exports = new GraphQLSchema({ query, mutation });
