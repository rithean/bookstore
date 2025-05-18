// src/dtos/transaction.dto.ts
export interface CreateTransactionDto {
  orderId: string;
  provider: string;
  transactionId: string;
  amount: number;
  status: "PENDING" | "COMPLETED" | "FAILED";
  refundStatus: "PENDING" | "REFUNDED" | "FAILED";
  metadata?: any;
}

export interface UpdateTransactionDto {
  status?: "PENDING" | "COMPLETED" | "FAILED";
  refundStatus?: "PENDING" | "REFUNDED" | "FAILED";
  metadata?: any;
}
