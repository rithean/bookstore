import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import app from "./app";

class Server {
  private app;
  private PORT: number | string;

  constructor() {
    this.app = app;
    this.PORT = process.env.PORT || 3001;
  }

  public async startServer() {
    try {
      this.app.listen(this.PORT, () => {
        console.log(`Server is running on http://localhost:${this.PORT}`);
      });
    } catch (error) {
      console.error("Error starting the server:", error);
      process.exit(1);
    }
  }
}

const server = new Server();
server.startServer();
