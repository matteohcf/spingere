import {GradientBox} from "../../../components/layout";
import {Col, Icon, Text} from "../../../components";
import {t} from "i18next";
import {colors} from "../../../constant";
import {StatisticsBoxImage, WaterDropsImage} from "../../../assets";

type Props = {
  onPress: () => void;
};

export const MyStatisticsButton = ({ onPress }: Props) => {
  return (
    <GradientBox colors={['#41a4f1', '#0a36bd']} image={false} imageSource={StatisticsBoxImage} onPress={onPress}>
      <Col alignItems={'center'} justifyContent={'center'} bgColor={'bgTertiary'} br={12} h={48} w={48} mh={16}>
        <Icon icon={['fal', 'toilet']} size={24} color={'white'} />
      </Col>
      <Text color={'white'} fontSize={18}>
        {t('my statistics')}
      </Text>
    </GradientBox>
  )
}
