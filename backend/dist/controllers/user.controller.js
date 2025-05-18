"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../utils/response");
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.getAllUsers();
                (0, response_1.successResponse)(res, 200, users);
            }
            catch (error) {
                (0, response_1.errorResponse)(res, 500, error.message || "Error fetching users", error);
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield this.userService.getUserById(id);
                (0, response_1.successResponse)(res, 200, user);
            }
            catch (error) {
                (0, response_1.errorResponse)(res, 500, error.message || "Error fetching user", error);
            }
        });
    }
    getUserByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            try {
                const user = yield this.userService.getUserByEmail(email);
                (0, response_1.successResponse)(res, 200, user);
            }
            catch (error) {
                (0, response_1.errorResponse)(res, 500, error.message || "Error fetching user", error);
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            try {
                const newUser = yield this.userService.createUser(userData);
                (0, response_1.successResponse)(res, 201, "User created successfully.");
            }
            catch (error) {
                (0, response_1.errorResponse)(res, 500, error.message || "Error creating user", error);
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const updatedData = req.body;
            try {
                const updatedUser = yield this.userService.updateUser(id, updatedData);
                (0, response_1.successResponse)(res, 200, "User updated successfully.");
            }
            catch (error) {
                (0, response_1.errorResponse)(res, 500, error.message || "Error updating user", error);
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.userService.deleteUser(id);
                (0, response_1.successResponse)(res, 200, "User deleted successfully.");
            }
            catch (error) {
                (0, response_1.errorResponse)(res, 500, error.message || "Error deleting user", error);
            }
        });
    }
}
exports.default = UserController;
