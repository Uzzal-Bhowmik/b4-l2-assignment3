import { Server } from "http";
import mongoose from "mongoose";
import config from "./config";
import app from "./app";
import ip from "ip";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);

    server = app.listen(config.port, () => {
      console.log(`Server is running on -> ${ip.address()}:${config.port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

process.on("unhandledRejection", () => {
  console.log("👿 unhandledRejection detected. Shutting down server....");

  if (server) {
    server.close();
  }

  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log("👿 uncaughtException detected. Shutting down server...");

  process.exit();
});

main();
