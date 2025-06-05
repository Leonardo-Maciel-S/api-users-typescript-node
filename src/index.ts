import express from "express";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";
import { routers } from "./routes/users";

const main = async () => {
  config();
  const app = express();

  app.use(express.json());

  app.use(routers);

  await MongoClient.connect();

  const port = process.env.PORT || 8000;

  app.listen(port, () => {
    console.log("App rodando em: http://localhost:" + port);
  });
};

main();
