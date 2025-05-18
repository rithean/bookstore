import OrderService from "@/services/order.service";
import { errorResponse, successResponse } from "@/utils/response";
import { Request, Response } from "express";

class OrderController {
  constructor(private readonly orderService: OrderService) {}

  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        errorResponse(res, 401, "Unauthorized.");
      }

      const orderData = {
        ...req.body,
        userId,
      };

      await this.orderService.createOrder(orderData);
      successResponse(res, 201, "Order created successfully.");
    } catch (error: any) {
      console.error(`Error creating order: ${error}`);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }

  async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;
      const isAdmin = user?.role === "admin";

      const orders = await this.orderService.getAllOrders(
        isAdmin ? undefined : user.id
      );

      successResponse(res, 200, orders);
    } catch (error: any) {
      console.error(`Error fetching orders: ${error}`);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }

  async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const order = await this.orderService.getOrderById(req.params.id);

      if (!order) {
        errorResponse(res, 404, "Order not found.");
      }

      successResponse(res, 200, order);
    } catch (error: any) {
      console.error(`Error fetching order by ID: ${error}`);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }

  async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      const updated = await this.orderService.updateOrder(
        req.params.id,
        req.body
      );

      if (!updated) {
        errorResponse(res, 404, "Order not found or deleted.");
      }

      successResponse(res, 200, "Order updated successfully.");
    } catch (error: any) {
      console.error(`Error updating order: ${error}`);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }

  async hardDelete(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await this.orderService.hardDelete(req.params.id);

      if (!deleted) {
        errorResponse(res, 404, "Order not found or already deleted.");
      }

      successResponse(res, 200, "Order deleted successfully.");
    } catch (error: any) {
      console.error(`Error deleting order: ${error}`);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }

  async softDelete(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await this.orderService.softDelete(req.params.id);

      if (!deleted) {
        errorResponse(res, 404, "Order not found or already deleted.");
      }

      successResponse(res, 200, "Order deleted successfully.");
    } catch (error: any) {
      console.error(`Error deleting order: ${error}`);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }

  async restoreOrder(req: Request, res: Response): Promise<void> {
    try {
      const restored = await this.orderService.restoreOrder(req.params.id);

      if (!restored) {
        errorResponse(res, 404, "Order not found or not deleted.");
      }

      successResponse(res, 200, "Order restored successfully.");
    } catch (error: any) {
      console.error(`Error restoring order: ${error}`);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }
}

export default OrderController;
