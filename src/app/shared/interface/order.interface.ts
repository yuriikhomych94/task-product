import { IProduct } from "./product.interface";

export interface IOrder {
    id: number;
    name: string;
    orders: any;
    totalPrice: string;
    totalPayment: string;
    count: string;
}