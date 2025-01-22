import { WithMongooseProps } from './withMongooseProps';
import { OdinImageType } from './odin.ts';

export type Quest = WithMongooseProps<{
  type: QuestTypes;
  image: OdinImageType;
  name: string;
  description: string;
  level: number;
  goal: number;
  advancement: number;
  isHidden: boolean;
  isCompleted: boolean;
  questLevelId: string;
  completedAt: string;
}>;

export enum QuestTypes {
  NIGHT_PEE = 'nightPee',
  CUSTOM = 'custom',
  IRON_BLADDER = 'ironBladder',
  BLADDER_BLITZ = 'bladderBlitz',
  MOUNTAIN_MAN = 'mountainMan',
  POWER_PEE = 'powerPee',
  PIZZA_LOVER = 'pizzaLover',
  THE_VIKING = 'theViking',
  PEE_MASTER = 'peeMaster',
  THE_ADVENTURER = 'theAdventurer',
  HYDRATION_HERO = 'hydrationHero',
  THE_MARATHONER = 'theMarathoner',
}
