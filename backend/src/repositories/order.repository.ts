import { db } from "@/config/db";
import { CreateOrderDTO, UpdateOrderDTO } from "@/dtos/order.dto";
import { Order } from "@/generated/prisma";

class OrderRepository {
  async create(orderDto: CreateOrderDTO): Promise<Order> {
    const { orderItems, ...orderData } = orderDto;

    const bookIds = orderItems.map((item) => item.bookId);
    const books = await db.book.findMany({
      where: { id: { in: bookIds } },
    });

    const itemsToCreate = orderItems.map((item) => {
      const book = books.find((b) => b.id === item.bookId);
      const price = book?.price ?? 0;
      const discount = item.discount ?? 0;
      const subtotal = price * item.quantity - discount;

      return {
        bookId: item.bookId,
        quantity: item.quantity,
        price,
        discount,
        subtotal,
        titleSnapshot: book?.title || "",
        coverUrlSnapshot: book?.coverUrl || "",
      };
    });

    const totalAmount = itemsToCreate.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );

    const order = await db.order.create({
      data: {
        userId: orderData.userId,
        total: totalAmount,
        note: orderData.note,
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod,
        paymentStatus: orderData.paymentStatus ?? "PENDING",
        shippingStatus: orderData.shippingStatus ?? "PENDING",
        paidAt: orderData.paidAt,
        deliveredAt: orderData.deliveredAt,
        orderItems: {
          create: itemsToCreate,
        },
      },
      include: {
        user: true,
        orderItems: {
          include: { book: true },
        },
      },
    });

    return order;
  }

  async findAll(userId?: string): Promise<Order[]> {
    const orders = await db.order.findMany({
      where: {
        isDeleted: false,
        ...(userId ? { userId } : {}),
      },
      include: {
        user: true,
        orderItems: {
          include: { book: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return orders;
  }

  async findById(id: string): Promise<Order | null> {
    const order = await db.order.findUnique({
      where: { id },
      include: {
        user: true,
        orderItems: {
          include: { book: true },
        },
      },
    });

    if (!order || order.isDeleted) return null;
    return order;
  }

  async update(id: string, updateDto: UpdateOrderDTO): Promise<Order | null> {
    const existing = await db.order.findUnique({
      where: { id },
      include: { orderItems: true },
    });

    if (!existing || existing.isDeleted) return null;

    const { orderItems, shippingAddress, ...restData } = updateDto;
    const dataToUpdate: any = { ...restData };

    const updatedOrder = await db.$transaction(async (tx) => {
      if (orderItems) {
        await tx.orderItem.updateMany({
          where: { orderId: id, isDeleted: false },
          data: { isDeleted: true },
        });

        const bookIds = orderItems.map((item) => item.bookId);
        const books = await tx.book.findMany({
          where: { id: { in: bookIds } },
        });

        const itemsToCreate = orderItems.map((item) => {
          const book = books.find((b) => b.id === item.bookId);
          const price = book?.price ?? 0;
          const discount = item.discount ?? 0;
          const subtotal = price * item.quantity - discount;

          return {
            orderId: id,
            bookId: item.bookId,
            quantity: item.quantity,
            price,
            discount,
            subtotal,
            titleSnapshot: book?.title || "",
            coverUrlSnapshot: book?.coverUrl || "",
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        });

        await tx.orderItem.createMany({ data: itemsToCreate });

        dataToUpdate.total = itemsToCreate.reduce(
          (sum, item) => sum + item.subtotal,
          0
        );
      }

      if (shippingAddress) {
        dataToUpdate.shippingAddress = shippingAddress;
      }

      return tx.order.update({
        where: { id },
        data: dataToUpdate,
        include: {
          user: true,
          orderItems: {
            where: { isDeleted: false },
            include: { book: true },
          },
        },
      });
    });

    return updatedOrder;
  }

  async hardDelete(id: string): Promise<Order | null> {
    const existing = await db.order.findUnique({ where: { id } });
    if (!existing) return null;

    await db.$transaction([
      db.orderItem.deleteMany({ where: { orderId: id } }),
      db.order.delete({ where: { id } }),
    ]);

    return existing;
  }

  async softDelete(id: string): Promise<Order | null> {
    const order = await db.order.findUnique({ where: { id } });
    if (!order || order.isDeleted) return null;

    await db.$transaction([
      db.order.update({
        where: { id },
        data: { isDeleted: true },
      }),
      db.orderItem.updateMany({
        where: { orderId: id, isDeleted: false },
        data: { isDeleted: true },
      }),
    ]);

    const updated = await db.order.findUnique({
      where: { id },
      include: {
        user: true,
        orderItems: {
          include: { book: true },
        },
      },
    });

    return updated ?? null;
  }

  async restore(id: string): Promise<Order | null> {
    const order = await db.order.findUnique({ where: { id } });
    if (!order || !order.isDeleted) return null;

    await db.$transaction([
      db.order.update({
        where: { id },
        data: { isDeleted: false },
      }),
      db.orderItem.updateMany({
        where: { orderId: id, isDeleted: true },
        data: { isDeleted: false },
      }),
    ]);

    return this.findById(id);
  }
}

export default OrderRepository;
