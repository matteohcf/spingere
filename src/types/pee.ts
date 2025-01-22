import { WithMongooseProps } from './withMongooseProps.ts';
import { Position } from './state.ts';
import { User } from './user.ts';

export type Pee = WithMongooseProps<{
  color?: PeeColorType;
  rating?: PeeRatingType;
  friendIds: string[];
  friends?: User[];
  position?: {
    type?: string;
    coordinates?: Position;
  };
  userId: string;
}>;

export enum PeeColorType {
  TRANSPARENT = '#F2F2F2',
  LIGHT_YELLOW = '#FFFF99',
  YELLOW = '#FFEB3B',
  DARK_YELLOW = '#FFCA28',
  AMBER = '#FFB300',
}

export enum PeeRatingType {
  VERY_BAD = 1,
  BAD = 2,
  NORMAL = 3,
  GOOD = 4,
  VERY_GOOD = 5,
}

export enum PeePositionType {
  SITTING = 'SITTING',
  STANDING = 'STANDING',
  SQUATTING = 'SQUATTING',
  STANDING_WALL = 'STANDING_WALL',
}
