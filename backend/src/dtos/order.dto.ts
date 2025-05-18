import {
  PaymentMethod,
  PaymentStatus,
  ShippingStatus,
} from "@/generated/prisma";
import { CreateOrderItemDto } from "./orderItem.dto";

type ShippingAddress = {
  fullName: string;
  address: string;
  city: string;
  phone: string;
}

export class CreateOrderDTO {
  userId!: string;
  orderItems!: CreateOrderItemDto[];
  shippingAddress!: ShippingAddress;
  paymentMethod!: PaymentMethod;
  paymentStatus?: PaymentStatus;
  shippingStatus?: ShippingStatus;
  paidAt?: Date;
  deliveredAt?: Date;
  total!: number;
  note?: string;
}

export class UpdateOrderDTO {
  orderItems?: CreateOrderItemDto[];
  paymentMethod?: PaymentMethod;
  paymentStatus?: PaymentStatus;
  shippingStatus?: ShippingStatus;
  paidAt?: Date;
  deliveredAt?: Date;
  couponCode?: string;
  note?: string;
  shippingAddress?: ShippingAddress;
}
