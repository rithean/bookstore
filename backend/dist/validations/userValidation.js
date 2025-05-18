"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
    phone: zod_1.z.string().optional(),
    dob: zod_1.z.date().optional(),
    gender: zod_1.z.enum(["MALE", "FEMALE"]).optional(),
    address: zod_1.z.string().optional(),
    avatar: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    role: zod_1.z.enum(["USER", "ADMIN"]).optional(),
});
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email("Invalid email address").optional(),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .optional(),
    phone: zod_1.z.string().optional(),
    dob: zod_1.z.date().optional(),
    gender: zod_1.z.enum(["MALE", "FEMALE"]).optional(),
    address: zod_1.z.string().optional(),
    avatar: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    role: zod_1.z.enum(["USER", "ADMIN"]).optional(),
});
