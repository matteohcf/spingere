import { WithMongooseProps } from './withMongooseProps';
import { OdinImageType } from './odin.ts';
import { User } from './user.ts';

export type Product = WithMongooseProps<{
  name: string;
  alcohol: boolean;
  image?: OdinImageType;
  price: number;
  category: ProductCategoryEnum;
  templateId: string;
  template: ProductTemplate;
}>;

export enum ProductCategoryEnum {
  BASE = 'base',
  PREMIUM = 'premium',
}

export type ProductTemplate = WithMongooseProps<{
  name: string;
  alcohol: boolean;
  image?: OdinImageType;
  price: number;
  category: ProductCategoryEnum;
}>;

export type OrderItem = WithMongooseProps<{
  name: string;
  userId: string;
  user: User;
  templateId: string;
  template: ProductTemplate;
  productId: string;
  product: Product;
  materializedProduct: Product;
  status: OrderItemStatus;
  redeemById: User;
  redeemBy: User;
  orderId: string;
  eventId: string;
  redeemDate: string;
  isPayed: boolean;
  itemPurchaseType: ItemPurchaseTypeEnum;
  price: number;
  paymentType: paymentTypeTypes;
}>;

export type Order = WithMongooseProps<{
  userId: string;
  creatorId: string;
  status: OrderStatusesEnum;
  isPayed: boolean;
  price: number;
  quantity: number;
  discoId: string;
  eventId: string;
  reservationId: string;
  paymentType: paymentTypeTypes;
  orderItems: OrderItem[];
}>;

export type paymentTypeTypes = 'loco' | 'stripe' | 'gift' | 'free-drink';

export enum OrderItemStatus {
  USABLE = 'usable',
  USED = 'used',
  BLOCKED = 'blocked',
}

export enum ItemPurchaseTypeEnum {
  PURCHASE = 'purchase',
  FREE_DRINK = 'free_drink',
  GIFT = 'gift',
}

export enum OrderStatusesEnum {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}
