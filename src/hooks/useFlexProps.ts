import { FlexProps } from '../types';

export const useFlexProps = (styleProps: FlexProps): FlexProps => {
  const { alignContent, justifyContent, alignItems, alignSelf, flexWrap, gap, rowGap, flex } =
    styleProps;

  return {
    alignContent,
    justifyContent,
    alignItems,
    alignSelf,
    flexWrap,
    gap,
    rowGap,
    flex,
  };
};
