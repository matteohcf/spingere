import { Card, Col, Icon, Row, Text } from '../../../components';
import { colors, SHADOW } from '../../../constant';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { Theme } from '../../../types';
import { StyleSheet } from 'react-native';

type InfoBoxIconProps = {
  icon?: IconProp;
  title?: string;
  subtitle?: string | JSX.Element;
  onPress?: () => void;
  titleFontSize?: number;
  rightArrow?: boolean;
};

export const InfoBoxWithIcon = ({ icon, title, subtitle, titleFontSize, onPress, rightArrow = false }: InfoBoxIconProps) => {
  const styles = useStylesheet(createStyles);
  return (
    <Card bgColor={'bgSurface1'} br={12} onPress={onPress} style={styles.card}>
      <Row gap={12} alignItems={'center'}>
        {icon && (
          <Col alignItems={'center'} justifyContent={'center'} bgColor={'bgSurface1'} br={40} h={48} w={48}>
            <Icon icon={icon} size={20} color={colors.textPrimary} />
          </Col>
        )}
        <Col flex={1}>
          {!!title && <Text fontSize={titleFontSize || 12}>{title}</Text>}
          {!!subtitle && (
            <Text fontSize={16} mt={4}>
              {subtitle}
            </Text>
          )}
        </Col>
        {rightArrow && (
          <Col>
            <Icon icon={['fal', 'chevron-right']} size={20} color={colors.textPrimary} />
          </Col>
        )}
      </Row>
    </Card>
  );
};

const createStyles = ({ colors, spacing, shapes }: Theme) =>
  StyleSheet.create({
    card: {
      ...SHADOW.SMALL,
    },
  });
