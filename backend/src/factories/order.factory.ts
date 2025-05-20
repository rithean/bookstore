import OrderController from "@/controllers/order.controller";
import OrderRepository from "@/repositories/order/order.repository";
import OrderService from "@/services/order.service";

export function orderFactory(): OrderController {
    const orderRepository = new OrderRepository();
    const orderService = new OrderService(orderRepository);
    const orderController = new OrderController(orderService);

    return orderController;
}