import { WithMongooseProps } from './withMongooseProps';

export type OdinImageType = WithMongooseProps<{
  createdAt: string;
  documentType: string;
  full: string;
  isActive: boolean;
  isCover: boolean;
  linkedEntity: {
    linkedEntityType: string;
    linkedEntityId: string;
  };
  metadata: {
    format: string;
    height: number;
    width: number;
  };
  thumbnail: {
    medium: string;
    mediumMetadata: {
      format: string;
      height: number;
      width: number;
    };
    squared: string;
    squaredMetadata: {
      format: string;
      height: number;
      width: number;
    };
  };
  updatedAt: string;
  uploaderId: string;
  __v: number;
  _id: string;
}>;

export type OdinVideoType = WithMongooseProps<{
  createdAt: string;
  documentType: string;
  full: string;
  isActive: boolean;
  isCover: boolean;
  linkedEntity: {
    linkedEntityType: string;
    linkedEntityId: string;
  };
  metadata: {
    format: string;
    height: number;
    width: number;
  };
  thumbnail: {
    medium: string;
    mediumMetadata: {
      format: string;
      height: number;
      width: number;
    };
    squared: string;
    squaredMetadata: {
      format: string;
      height: number;
      width: number;
    };
  };
  updatedAt: string;
  uploaderId: string;
  __v: number;
  _id: string;
}>;
