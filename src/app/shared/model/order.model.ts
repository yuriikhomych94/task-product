import { IOrder } from '../interface/order.interface';

export class Order implements IOrder {
    constructor(
        public id,
        public name,
        public orders,
        public totalPrice,
        public totalPayment,
        public count,
    ) {}
}
