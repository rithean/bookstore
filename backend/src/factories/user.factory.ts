import UserController from "@/controllers/user.controller";
import UserRepository from "@/repositories/user/user.repository";
import UserService from "@/services/user.service";

export function userFactory(): UserController {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    return userController;
}