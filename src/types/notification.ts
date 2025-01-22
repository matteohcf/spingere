import { WithMongooseProps } from './withMongooseProps.ts';
import { User } from './user.ts';

export type Notification = WithMongooseProps<{
  createdBy: string;
  createdByUser: User;
  targetUser: User;
  sent: boolean;
  event: NotificationEventType;
  title: string;
  hasBeenSeen: boolean;
  body: string;
  genericId: string;
}>;

export enum NotificationEventType {
  PEE_REMINDER = 'peeReminder',
  FRIEND_REQUEST = 'friendRequest',
  QUEST_COMPLETED = 'questCompleted',
  PEE_TAG = 'peeTag',
}
