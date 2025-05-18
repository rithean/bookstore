"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, statusCode, dataOrMessage, data) => {
    let response = {
        status: true,
    };
    if (typeof dataOrMessage === "string") {
        response.message = dataOrMessage;
        if (data !== undefined) {
            response.data = data;
        }
        else {
            response.data = dataOrMessage;
        }
    }
    return res.status(statusCode).json(response);
};
exports.successResponse = successResponse;
const errorResponse = (res, statusCode, message, error) => {
    let response = {
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
exports.errorResponse = errorResponse;
