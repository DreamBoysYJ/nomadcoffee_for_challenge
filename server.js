const { ApolloServer } = require("apollo-server-express");
import "dotenv/config";
import http from "http";
import express from "express";
import logger from "morgan";
import { resolvers, typeDefs } from "./schema";

const apollo = new ApolloServer({ resolvers, typeDefs });

const PORT = process.env.PORT;

const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql!!!`);
});
