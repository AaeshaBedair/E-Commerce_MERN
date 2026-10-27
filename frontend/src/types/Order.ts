export interface OrderItem {
  productTitle: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
}

export interface Order {
  _id: string;
  orderItems: OrderItem[];
  total: number;
  address: string;
  createdAt?: string;
}