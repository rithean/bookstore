import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per IP per 15 minutes
  message: "Too many requests, please try again later.",
  standardHeaders: true, // Sends `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers (recommended)
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many requests, please try again later.",
    });
  },
});

export default limiter;
