export interface OrderItem {
  productName: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
}

export interface Order {
  id: number;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  status: string;
  notes?: string;
  items: OrderItem[];
}

export interface OrderCreateDto {
  items: { productId: number; quantity: number }[];
  notes?: string;
}

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}
