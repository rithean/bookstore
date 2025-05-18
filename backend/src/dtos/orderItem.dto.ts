export class CreateOrderItemDto {
  bookId!: string;
  quantity!: number;
  discount!: number;
}

export class UpdateOrderItemDto {
  quantity?: number;
  discount?: number;
}
