import { WithMongooseProps } from './withMongooseProps';
import { OdinImageType } from './odin.ts';
import { Friend } from './friend.ts';
import { Quest } from './quest.ts';

export enum UserRole {
  User = 'user',
}
export type User = WithMongooseProps<{
  username: string;
  name: string;
  surname: string;
  email: string;
  birthDate?: string;
  sex?: UserSexType;
  role: UserRole;
  devices: {
    token: string;
    os: string;
  }[];
  profileImage: OdinImageType;
  isConfirmed: boolean;
  isEnabled: boolean;
  isDeleted: boolean;
  lastPee: string;
  dailyPees: number;
  streakPees: number;
  totalPees: number;
  totalFriends: number;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  preLastLogin: string;
  appVersion: string;
  deviceInfo: string;
  id: string;
  friend: Friend;
  quest?: Quest;
}>;

export enum UserSexType {
  MALE = 'M',
  FEMALE = 'F',
}
