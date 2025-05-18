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
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.getAll();
            if (users.length === 0) {
                throw new Error("No users found");
            }
            return users;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getById(id);
            if (!user) {
                throw new Error(`User with ID ${id} doesn't exist.`);
            }
            return user;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getByEmail(email);
            if (!user) {
                throw new Error(`User with email ${email} doesn't exist.`);
            }
            return user;
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.create(userData);
        });
    }
    updateUser(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userRepository.getById(id);
            if (!existingUser) {
                throw new Error(`User with ID ${id} doesn't exist.`);
            }
            return yield this.userRepository.update(id, updatedData);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userRepository.getById(id);
            if (!existingUser) {
                throw new Error(`User with ID ${id} doesn't exist.`);
            }
            return yield this.userRepository.delete(id);
        });
    }
}
exports.default = UserService;
