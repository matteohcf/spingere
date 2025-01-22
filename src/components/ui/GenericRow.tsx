import React from 'react';
import { StyleSheet } from 'react-native';
import { Chip, Col, Row, Text } from '../ui';
import { StyleProps, Theme } from '../../types';
import { useStylesheet } from '../../hooks/useStylesheet';

type SiteScreensCardItemProps = StyleProps & {
  onPress: () => void;
  title: string;
  subtitle: string;
  tags?: string[];
  showBorder?: boolean;
};

export const GenericRow = ({
  onPress,
  title,
  subtitle,
  tags = [],
  ...rest
}: SiteScreensCardItemProps) => {
  const styles = useStylesheet(createStyles);

  return (
    <Col pt={13} pb={8} style={[styles.container]} onPress={onPress} w={'100%'} {...rest}>
      <Text mb={3} numberOfLines={1} fontWeight={'400'} fontSize={20}>
        {title}
      </Text>
      <Text fontSize={15} mb={5} numberOfLines={1} fontWeight={'300'}>
        {subtitle}
      </Text>
      <Row alignItems={'center'} justifyContent={'space-between'} gap={4}>
        {tags.map(tag => {
          return <Chip key={tag} value={tag} />;
        })}
        <Col style={{ flex: 1 }} />
      </Row>
    </Col>
  );
};

const createStyles = ({ colors, spacing }: Theme) =>
  StyleSheet.create({
    icon: {
      width: 53,
      height: 53,
      borderRadius: 50,
      marginRight: spacing.standardMargin,
      backgroundColor: colors.primary,
    },
    container: {},
    descriptionContainer: {
      backgroundColor: '#D9D9D9',
      paddingHorizontal: 13,
      height: 22,
      borderRadius: 10,
    },
  });
