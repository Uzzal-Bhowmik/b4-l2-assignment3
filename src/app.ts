import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import notFound from "./middlewares/notFound";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import { RootRouter } from "./routes";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  }),
);

// application routes
app.use("/api", RootRouter);

// root route
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Server is running",
  });
});

// Global error handler
app.use(globalErrorHandler);

// Not found route
app.use(notFound);

export default app;
