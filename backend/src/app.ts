import express, { Express } from "express";
import cors from "cors";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import authorRoutes from "./routes/author.route";
import bookRoutes from "./routes/book.route";
import genreRoutes from "./routes/genre.route";
import orderRoutes from "./routes/order.route";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/orders", orderRoutes);

export default app;
