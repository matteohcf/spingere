import { WithMongooseProps } from './withMongooseProps';
import { User } from './user.ts';

export type Leaderboard = WithMongooseProps<{
  user: User;
  count: number;
}>;
