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
const db_1 = require("../config/db");
class UserRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.db.user.findMany();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.db.user.findUnique({
                where: { id },
            });
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.db.user.findUnique({
                where: { email },
            });
        });
    }
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.db.user.create({
                data: userData,
            });
        });
    }
    update(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.db.user.update({
                where: { id },
                data: updatedData,
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.db.user.delete({
                where: { id },
            });
        });
    }
}
exports.default = UserRepository;
