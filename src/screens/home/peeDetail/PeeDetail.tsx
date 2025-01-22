import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SharedStackParamList } from '../../../core/navigation/RootNavigator.tsx';
import { Button, Col, Container, Icon, Row, Text, TextField } from '../../../components';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { Theme } from '../../../types';
import { ScrollView, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pee, PeeColorType, PeePositionType, PeeRatingType } from '../../../types/pee.ts';
import { trigger } from 'react-native-haptic-feedback';
import { t } from 'i18next';
import { PeeColorButton } from './components/PeeColorButton.tsx';
import { PeeRatingButton } from './components/PeeRatingButton.tsx';
import { showSelectModalMultiple } from '../../../components/modal';
import { formFieldProps, formikProps } from '../../../utils/form.ts';
import { peeDetailsSchema } from '../../../utils/validations.ts';
import { useFormik } from 'formik';
import { colors } from '../../../constant';
import { PeePositionButton } from './components/PeePositionButton.tsx';
import { addPeeDetails, deletePee, getPeeDetail } from '../../../api/pee.ts';
import { showToast } from '../../../utils/toast.ts';
import { useFocusEffect } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { showAlertSiteModal } from '../../../components/floatingModal';
import { getMe } from '../../../api/user.ts';
import { FilterEnum } from "../../map/components/MapMarkers.tsx";

type Props = NativeStackScreenProps<SharedStackParamList, 'PeeDetail'>;

type FormValues = {
  color: PeeColorType | undefined;
  rating: PeeRatingType | undefined;
  position: PeePositionType | undefined;
  friendsIds: string[];
  friendsLabel: string;
};

export const PeeDetail = ({ navigation, route }: Props) => {
  const passedPee = route.params.pee;
  const isAdd = route.params.isAdd;
  const [pee, setPee] = useState<Pee>(passedPee);
  const styles = useStylesheet(createStyles);
  const selectedFriendsIds = useRef(passedPee?.friendIds || []);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const peeColors = [PeeColorType.TRANSPARENT, PeeColorType.LIGHT_YELLOW, PeeColorType.YELLOW, PeeColorType.DARK_YELLOW, PeeColorType.AMBER];
  const peeRatings = [PeeRatingType.VERY_BAD, PeeRatingType.BAD, PeeRatingType.NORMAL, PeeRatingType.GOOD, PeeRatingType.VERY_GOOD];
  const peePositions = [PeePositionType.SITTING, PeePositionType.STANDING, PeePositionType.SQUATTING, PeePositionType.STANDING_WALL];

  if (!passedPee) return;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Icon icon={['far', 'trash']} size={26} color={colors.black} onPress={onPressDeletePee} />,
    });
  }, [navigation]);

  const onPressDeletePee = async () => {
    showAlertSiteModal({
      title: t('alerts.deletePeeTitle'),
      description: t('alerts.deletePeeDescription'),
      showUndo: true,
      undoText: t('cancel'),
      type: 'error',
      onConfirm: async () => {
        try {
          await deletePee(passedPee._id);
          await getMe();
          queryClient.invalidateQueries({ queryKey: ['pees/history-history'] });
          queryClient.invalidateQueries({ queryKey: ['peesWeeklyKpi'] });
          queryClient.invalidateQueries({ queryKey: [`pees/history-map-${FilterEnum.ALL}`] });
          queryClient.invalidateQueries({ queryKey: [`pees/history-map-${FilterEnum.LAST}`] });
          navigation.pop();
          showToast(t('toasts.peeDeletedTitle'), t('toasts.peeDeletedMessage'), { type: 'success' });
        } catch (e) {
          showToast(t('toasts.errorTitle'), t('toasts.errorMessage'), { type: 'error' });
        }
      },
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchPeeDetail = async () => {
        const res = await getPeeDetail(pee._id);
        if (res) {
          setPee(res);
        }
      };
      fetchPeeDetail();
    }, [pee._id]),
  );

  const peeFriendsLabel = useMemo(() => {
    return pee.friends?.map(f => f.username).join(', ');
  }, [pee.friends]);

  const { values, errors, setFieldError, setFieldValue, handleSubmit } = useFormik<FormValues>({
    initialValues: {
      color: pee?.color || undefined,
      rating: pee?.rating || undefined,
      position: undefined,
      friendsIds: pee?.friendIds || [],
      friendsLabel: peeFriendsLabel || '',
    },
    ...formikProps,
    validationSchema: peeDetailsSchema,
    onSubmit: async val => {
      const params = {
        color: val.color,
        rating: val.rating,
        friendIds: val.friendsIds,
      };
      try {
        setLoading(true);
        await addPeeDetails(params, passedPee._id);
        setLoading(false);
        queryClient.invalidateQueries({ queryKey: ['pees/history-history'] });
        navigation.pop();
        showToast(t('toasts.peeDetailsSuccessTitle'), t('toasts.peeDetailsSuccessMessage'), { type: 'success' });
      } catch (e) {
        setLoading(false);
      }
    },
  });

  const fieldProps = formFieldProps(errors, values, setFieldError, setFieldValue);

  const onPressSelectFriends = useCallback(() => {
    showSelectModalMultiple({
      keyProp: 'friendsListModal',
      entity: 'friends/list',
      value: selectedFriendsIds.current,
      rowValue: 'username',
      title: t('select friends'),
      inputSearch: true,
      /*filters: {  },*/
      onSelect: (item: any) => {
        setFieldValue('friendsIds', item.value);
        const label = item.label.length > 37 ? `${item.label.slice(0, 37)}...` : item.label;
        setFieldValue('friendsLabel', label);
        selectedFriendsIds.current = item.value;
        setFieldError('friendsLabel', '');
      },
    });
  }, [values, selectedFriendsIds]);

  const onPressGoToMap = () => {
    navigation.navigate('Map', { pee: pee });
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Col gap={8} mt={8}>
          <Text color={colors.textPrimary} fontSize={14} fontWeight={'500'} lineHeight={24}>
            {t('select pee color')}
          </Text>
          <Row>
            {peeColors.map((color, index) => (
              <PeeColorButton
                key={index}
                onPress={() => {
                  setFieldValue('color', color);
                  trigger('impactLight');
                }}
                selectedPeeColor={values.color}
                type={color}
              />
            ))}
          </Row>
        </Col>
        <Col gap={8} mt={24}>
          <Text color={colors.textPrimary} fontSize={14} fontWeight={'500'} lineHeight={24}>
            {t('select pee rating')}
          </Text>
          <Row>
            {peeRatings.map((rating, index) => (
              <PeeRatingButton
                key={index}
                onPress={() => {
                  setFieldValue('rating', rating);
                  trigger('impactLight');
                }}
                selectedPeeRating={values.rating}
                type={rating}
              />
            ))}
          </Row>
        </Col>
        {/*<Col gap={8} mt={24}>
          <Text color={colors.textPrimary} fontSize={14} fontWeight={'500'} lineHeight={24}>
            {t('select pee position')}
          </Text>
          <Row>
            {peePositions.map((rating, index) => (
              <PeePositionButton
                key={index}
                onPress={() => {
                  setFieldValue('position', rating);
                  trigger('impactLight');
                }}
                selectedPeePosition={values.position}
                type={rating}
              />
            ))}
          </Row>
        </Col>*/}
        <Col mt={24} gap={8}>
          {/*@ts-ignore*/}
          <TextField
            label={t('pee with friend?')}
            autoCapitalize={'none'}
            type={'text'}
            {...fieldProps('friendsLabel')}
            onPressInput={onPressSelectFriends}
            pointerEventsBlock
            pointerEvents={'none'}
            iconRight={['fas', 'chevron-down']}
          />
        </Col>
      </ScrollView>
      <Row gap={8} style={styles.lastRow}>
        {!isAdd && (
          <Button
            flex={1}
            variant={'gradient'}
            style={{ opacity: 0.8 }}
            gradientColors={['#77aeff', '#023785']}
            text={t('go to map')}
            onPress={onPressGoToMap}
          />
        )}
        <Button flex={1} variant={'gradient'} loading={loading} text={t('confirm')} onPress={handleSubmit} />
      </Row>
    </Container>
  );
};

const createStyles = ({ colors, spacing, shapes, insets }: Theme) =>
  StyleSheet.create({
    lastRow: {
      marginTop: 24,
      marginBottom: insets.safeBottom,
    },
  });
