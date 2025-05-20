import { CreateOrderDTO, UpdateOrderDTO } from "@/dtos/order.dto";
import { Order } from "@/generated/prisma";
import { IOrderRepository } from "@/repositories/order/IOrderRepository";

class OrderService {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async createOrder(orderDto: CreateOrderDTO): Promise<Order> {
    return this.orderRepository.create(orderDto);
  }

  async getAllOrders(userId?: string): Promise<Order[]> {
    const orders = await this.orderRepository.findAll(userId);
    if (!orders.length) {
      throw new Error("No orders found.");
    }
    return orders;
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new Error("Order not found.");
    }
    return order;
  }

  async updateOrder(id: string, updateDto: UpdateOrderDTO): Promise<Order> {
    const updatedOrder = await this.orderRepository.update(id, updateDto);
    if (!updatedOrder) {
      throw new Error("Failed to update order.");
    }
    return updatedOrder;
  }

  async hardDelete(id: string): Promise<Order> {
    const deletedOrder = await this.orderRepository.hardDelete(id);
    if (!deletedOrder) {
      throw new Error("Order not found or already deleted.");
    }
    return deletedOrder;
  }

  async softDelete(id: string): Promise<Order> {
    const deletedOrder = await this.orderRepository.softDelete(id);
    if (!deletedOrder) {
      throw new Error("Order not found or already deleted.");
    }
    return deletedOrder;
  }

  async restoreOrder(id: string): Promise<Order> {
    const restoredOrder = await this.orderRepository.restore(id);
    if (!restoredOrder) {
      throw new Error("Order not found or not deleted.");
    }
    return restoredOrder;
  }
}

export default OrderService;
