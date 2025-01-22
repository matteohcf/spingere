import React from 'react';
import { StyleSheet } from 'react-native';
import { Col, Row, Text } from '../ui';
import { StyleProps, Theme } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { useStylesheet } from '../../hooks/useStylesheet';

type SiteScreensCardItemProps = StyleProps & {
  onPress: () => void;
  title: string;
  subtitle: string;
  description: string;
  showBorder?: boolean;
};

export const SiteScreensCardItem = ({
  onPress,
  title,
  subtitle,
  description,
  ...rest
}: SiteScreensCardItemProps) => {
  const { colors, spacing } = useTheme();
  const styles = useStylesheet(createStyles);
  const testText =
    'Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque seco';

  return (
    <Col pt={13} pb={8} style={[styles.container]} onPress={onPress} w={'100%'} {...rest}>
      <Text mb={3} numberOfLines={1} fontWeight={'400'} fontSize={20}>
        {title}
      </Text>
      <Text fontSize={15} mb={5} numberOfLines={1} fontWeight={'300'}>
        {subtitle}
      </Text>
      <Row alignItems={'center'} justifyContent={'space-between'}>
        <Col justifyContent={'center'} alignItems={'center'} style={styles.descriptionContainer}>
          <Text color={'#878787'} fontWeight={'500'} fontSize={13}>
            tipo 1
          </Text>
        </Col>
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
