import { DISABLE_REANIMATED } from '../../config';
import ReAnimated, {
  useAnimatedScrollHandler as useAnimatedScrollHandlerRN,
  useSharedValue as useSharedValueRN,
} from 'react-native-reanimated';
import { Animated as RNAnimated } from 'react-native';

export const useAnimatedScrollHandler = (params: any) => {
  if (DISABLE_REANIMATED) {
    return {
      onScroll: (event: any) => {},
    };
  } else {
    return useAnimatedScrollHandlerRN(params);
  }
};

export const useSharedValue = (params: any) => {
  if (DISABLE_REANIMATED) {
    return params;
  } else {
    return useSharedValueRN(params);
  }
};

// export const AnimatedScrollView = () => {
//   if (DISABLE_REANIMATED) {
//     return RNAnimated.ScrollView;
//   } else {
//     return ReAnimated.ScrollView;
//   }
// };
export const AnimatedScrollView = ReAnimated.ScrollView;
