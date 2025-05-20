import { CreateOrderDTO, UpdateOrderDTO } from "@/dtos/order.dto";
import { Order, OrderItem, Book, User } from "@/generated/prisma";

export interface IOrderRepository {
  create(orderDto: CreateOrderDTO): Promise<
    Order & {
      user: User;
      orderItems: (OrderItem & { book: Book })[];
    }
  >;

  findAll(userId?: string): Promise<
    (Order & {
      user: User;
      orderItems: (OrderItem & { book: Book })[];
    })[]
  >;

  findById(id: string): Promise<
    | (Order & {
        user: User;
        orderItems: (OrderItem & { book: Book })[];
      })
    | null
  >;

  update(
    id: string,
    updateDto: UpdateOrderDTO
  ): Promise<
    | (Order & {
        user: User;
        orderItems: (OrderItem & { book: Book })[];
      })
    | null
  >;

  hardDelete(id: string): Promise<Order | null>;

  softDelete(id: string): Promise<
    | (Order & {
        user: User;
        orderItems: (OrderItem & { book: Book })[];
      })
    | null
  >;

  restore(id: string): Promise<
    | (Order & {
        user: User;
        orderItems: (OrderItem & { book: Book })[];
      })
    | null
  >;
}
