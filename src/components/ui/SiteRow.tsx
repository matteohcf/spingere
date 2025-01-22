import React from 'react';
import { Col, ImageWithFallback, Row, Text } from '../ui';
import { useTheme } from '../../hooks/useTheme';
import Site from '../../types/site';

type SiteRowProps = {
  site: Site;
  onPress: (site: Site) => void;
};

export const SiteRow = ({ site, onPress }: SiteRowProps) => {
  const { colors, spacing } = useTheme();
  return (
    <Row alignItems={'center'} pv={spacing.standardMargin / 2} onPress={() => onPress(site)}>
      <ImageWithFallback fallback={['fas', 'building']} size={60} image={site.image} />
      <Col ml={spacing.standardMargin}>
        <Text fontWeight={'700'} fontSize={16}>
          {site.name}
        </Text>
        <Text fontWeight={'300'}>{site.address}</Text>
      </Col>
    </Row>
  );
};
