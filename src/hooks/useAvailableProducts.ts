import { useSelector } from 'react-redux';
import { userSelectors } from '../store/user.ts';
import { DateTime } from 'luxon';
import { Product, ProductCategoryEnum } from '../types/product.ts';
import { EventFreeDrinkType } from '../types/event.ts';

type Props = {
  productList: Product[];
  productType?: EventFreeDrinkType;
};

export const useAvailableProducts = ({ productList, productType }: Props) => {
  const userData = useSelector(userSelectors.detail);
  if (!userData) {
    return [];
  }
  const isAdult = DateTime.now().diff(DateTime.fromISO(userData?.birthDate), 'years').years >= 18;
  return productList.filter(product => {
    if (!isAdult && product.alcohol) {
      return false;
    }
    if (productType === EventFreeDrinkType.BASE) {
      return product.category === ProductCategoryEnum.BASE;
    }
    if (productType === EventFreeDrinkType.PREMIUM || productType === undefined) {
      return true;
    }
    return true;
  });
};
