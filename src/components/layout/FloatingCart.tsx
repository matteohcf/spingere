import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Col, Icon, Row, Text } from '../ui';
import { Theme } from '../../types';
import { useTranslation } from 'react-i18next';
import { Product } from '../../types/product.ts';
import { useStylesheet } from '../../hooks/useStylesheet.ts';
import _ from 'lodash';
import { trigger } from 'react-native-haptic-feedback';

type Props = {
  onPressConfirmCart: (products: Product[]) => void;
};

export type FloatingCartRef = {
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
};

export const FloatingCart = forwardRef<FloatingCartRef, Props>(({ onPressConfirmCart }, ref) => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const styles = useStylesheet(createStyles);

  const setOrderedProducts = (newProducts: Product[]) => {
    setProducts(_.orderBy(newProducts, 'name'));
  };

  useImperativeHandle(ref, () => ({
    addToCart: newProduct => {
      setOrderedProducts([...products, newProduct]);
      // Implementa qui la logica per aggiungere al carrello
    },
    removeFromCart: product => {
      trigger('impactHeavy');
      const newProducts = [...products];
      const index = newProducts.findIndex(p => p._id === product._id);
      if (index === -1) {
        return;
      }
      newProducts.splice(index, 1);
      setOrderedProducts(newProducts);
    },
  }));

  const onPressRemove = (product: Product) => {
    trigger('impactHeavy');
    const newProducts = [...products];
    const index = newProducts.findIndex(p => p._id === product._id);
    newProducts.splice(index, 1);
    setOrderedProducts(newProducts);
  };

  const groupedProducts = _.groupBy(products, '_id');
  const total = (_.sumBy(products, 'price') / 100).toFixed(2);

  if (_.isEmpty(products)) {
    return null;
  }

  return (
    <Col style={styles.container}>
      <Col bgColor={'primary'} minH={50} w={'100%'} br={12} ph={'screenHorizontal'} pv={12}>
        {_.map(groupedProducts, (products, id) => (
          <CartRow key={id} products={products} onPressRemove={onPressRemove} />
        ))}
        <Row style={styles.hr} />
        <Row
          justifyContent={'space-between'}
          bgColor={'bgPrimary'}
          br={8}
          ph={'screenHorizontal'}
          pv={8}
          onPress={() => onPressConfirmCart(products)}>
          <Text fontSize={16} fontWeight={'700'}>
            {t('confirm cart')}
          </Text>
          <Text fontSize={18} fontWeight={'700'}>
            {total} €
          </Text>
        </Row>
      </Col>
    </Col>
  );
});

type CartRowProps = {
  products: Product[];
  onPressRemove: (product: Product) => void;
};

const CartRow = ({ products, onPressRemove }: CartRowProps) => {
  const product = products[0];
  const quantity = products.length;
  const singlePrice = (product.price / 100).toFixed(2);
  const total = ((product.price * quantity) / 100).toFixed(2);

  return (
    <Row alignItems={'center'}>
      <Icon icon={['far', 'times']} size={20} color={'black'} onPress={() => onPressRemove(product)} ml={-5} />
      <Text fontSize={16} color={'black'} fontWeight={'500'}>
        {product.name}
      </Text>
      <Row flex={1} />
      <Text color={'black'} fontWeight={'700'} fontSize={16}>
        {quantity} x {singlePrice} €
      </Text>
    </Row>
  );
};

const createStyles = ({ spacing, insets }: Theme) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      bottom: insets.safeBottom,
      left: 0,
      right: 0,
      width: '100%',
      paddingHorizontal: spacing.screenHorizontal,
    },
    hr: {
      borderBottomWidth: 1,
      borderBottomColor: 'black',
      marginVertical: 12,
    },
  });
