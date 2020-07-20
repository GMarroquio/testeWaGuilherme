export interface IOrder {
  id?: number;
  userId?: number;
  description: string;
  price: number;
  amount: number;

  createdDate?: Date;
  updatedDate?: Date;
}
