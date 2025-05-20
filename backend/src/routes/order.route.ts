import { Router } from "express";
import { authenticate, authorize } from "@/middleware/auth.middleware";
import { orderFactory } from "@/factories/order.factory";

const router = Router();
const orderController = orderFactory();

router.post(
  "/",
  authenticate,
  authorize(["USER", "ADMIN"]),
  orderController.createOrder.bind(orderController)
);

router.get(
  "/",
  authenticate,
  orderController.getAllOrders.bind(orderController)
);

router.get(
  "/:id",
  authenticate,
  orderController.getOrderById.bind(orderController)
);

router.put(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  orderController.updateOrder.bind(orderController)
);

router.delete(
  "/hard/:id",
  authenticate,
  authorize(["ADMIN"]),
  orderController.hardDelete.bind(orderController)
);

router.delete(
  "/soft/:id",
  authenticate,
  authorize(["ADMIN"]),
  orderController.softDelete.bind(orderController)
);

router.patch(
  "/restore/:id",
  authenticate,
  authorize(["ADMIN"]),
  orderController.restoreOrder.bind(orderController)
);

export default router;
