import express, { Application } from "express";
import cors from "cors";
import { mainApp } from "./mainApp";
import { mainconnect } from "./utils/dbConfig";
const port: number = 4500;

const app: Application = express();

app.use(cors());
app.use(express.json());

mainApp(app);
mainconnect();

const server = app.listen(port, () => {
  console.log("server is running 👍👌");
});
process.on("uncaughtException", (err: Error) => {
  console.log("uncaughtException", err);
  process.exit(1);
});
process.on("rejectionHandled", (reason: any) => {
  console.log("rejectionHandled", reason);

  server.close(() => {
    process.exit(1);
  });
});
