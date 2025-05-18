import { Response } from "express";

interface ApiResponse {
  status: boolean;
  message?: string;
  data?: any;
}

export const successResponse = (
  res: Response,
  statusCode: number,
  messageOrData?: string | any,
  data?: any
): Response<ApiResponse> => {
  const response: ApiResponse = {
    status: true,
  };

  if (typeof messageOrData === "string") {
    response.message = messageOrData;

    if (data !== undefined) {
      response.data = data;
    }
  } else if (messageOrData !== undefined) {
    response.data = messageOrData;
  }

  return res.status(statusCode).json(response);
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  message?: string,
  error?: any
): Response<ApiResponse> => {
  let response: ApiResponse = {
    status: false,
  };

  if (message) {
    response.message = message;
  }

  if (error !== undefined) {
    response.data = error;
  }

  return res.status(statusCode).json(response);
};
