import { Image, StyleSheet } from 'react-native';
import { Col, Icon, Loader, Row, Text } from '../../../components';
import React, { useState } from 'react';
import { getOdinImage, openGalleryImagePicker } from '../../../utils/images.ts';
import { defaultAvatar } from '../../../assets';
import { uploadFile } from '../../../api/uploads.ts';
import { getMe } from '../../../api/user.ts';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../../store/user.ts';
import { Theme } from '../../../types';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { colors, WIDTH_DEVICE } from '../../../constant';
import { getInitials } from '../../../utils/user.ts';
import { useProfileImageColor } from '../../../hooks/useProfileImageColor.ts';
import {StreakPeesBox} from "../../social/components/StreakPeesBox.tsx";

export const ProfileImageComponent = () => {
  const styles = useStylesheet(createStyles);
  const userDetail = useSelector(userSelectors.detail);
  const initial = getInitials(userDetail);
  const color = useProfileImageColor(userDetail);
  const profileImage = getOdinImage({
    image: userDetail?.profileImage,
  });
  const [loading, setLoading] = useState(false);

  const onPressUploadImage = async () => {
    const response = await openGalleryImagePicker(true, true);
    if (response) {
      try {
        setLoading(true);
        await uploadFile({
          linkedEntityId: userDetail?._id,
          linkedEntityType: 'profileImage',
          entityName: 'profileImage',
          uri: response.sourceURL,
        });
        await getMe();
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.error(e);
      }
    }
  };

  return (
    <Row>
      {!loading && profileImage && <Image source={profileImage} style={styles.profileImage} />}
      {!loading && !profileImage && (
        <Col bgColor={color} style={styles.profileImage} justifyContent={'center'} alignItems={'center'}>
          {!loading && initial && (
            <Text color={colors.white} fontSize={28} fontWeight={'600'}>
              {initial}
            </Text>
          )}
          <StreakPeesBox user={userDetail} />
          {!loading && !initial && <Icon icon={['far', 'user']} color={colors.white} size={20} />}
        </Col>
      )}
      {loading && <Loader style={styles.loader} color={colors.secondary} size={'large'} />}
    </Row>
  );
};

const createStyles = ({}: Theme) =>
  StyleSheet.create({
    profileImage: {
      width: WIDTH_DEVICE / 4,
      height: WIDTH_DEVICE / 4,
      borderRadius: WIDTH_DEVICE / 4 / 2,
    },
    loader: {
      width: WIDTH_DEVICE / 4,
      height: WIDTH_DEVICE / 4,
    },
  });
