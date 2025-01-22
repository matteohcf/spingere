export type WithMongooseProps<T> = T & {
  _id: string;
  createdAt: string;
  updatedAt?: string;
  id?: string;
};
