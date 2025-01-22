import { WithMongooseProps } from './withMongooseProps.ts';
import {User} from "./user.ts";

export type Friend = WithMongooseProps<{
  fromUser: User;
  fromUserId: string;
  toUser: User;
  toUserId: string;
  userIds: string[];
  status: FriendStatusesEnum;
}>;

export enum FriendStatusesEnum {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}
