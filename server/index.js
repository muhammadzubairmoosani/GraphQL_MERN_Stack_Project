const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const mongoDB = require("./config/db");
const port = process.env.PORT || 5000;
const schema = require("./graphQL/index");
require("dotenv").config();

const app = express();

// Connect to DB
mongoDB();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, console.log("Server on running port on: " + port));
