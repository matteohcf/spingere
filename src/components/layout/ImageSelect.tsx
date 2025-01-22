import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { camera, upload } from '../../assets';
import { openImagePicker, openVideoPicker } from '../../utils/images';
import { Button, Col } from '../ui';
import { useTheme } from '../../hooks/useTheme';
import { ImageType, VideoType } from '../../types/media';

type MediaSelectProps = {
  onSelectImage: (image: ImageType) => void;
  onSelectVideo?: (video: VideoType) => void;
};

export const ImageSelect = ({ onSelectImage, onSelectVideo }: MediaSelectProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const uploadMedia = useCallback(
    async (type: 'gallery' | 'camera') => {
      try {
        const asset = await openImagePicker({
          cropping: true,
          freeStyleCropEnabled: true,
          type,
        });
        console.log({ asset });
        if (asset) {
          onSelectImage(asset);
        }
      } catch (e) {
        console.log({ e });
      }
    },
    [onSelectImage],
  );
  const uploadVideo = useCallback(
    async (type: 'gallery' | 'camera') => {
      try {
        const asset = await openVideoPicker({
          type,
        });
        console.log({ asset });
        if (asset) {
          onSelectVideo && onSelectVideo(asset);
        }
      } catch (e) {
        console.log({ e });
      }
    },
    [onSelectVideo],
  );

  return (
    <Col gap={10}>
      {!!onSelectVideo && (
        <>
          <Button
            variant={'tertiary'}
            onPress={() => uploadVideo('camera')}
            text={t('take video')}
            icon={['far', 'video']}
            iconColor={colors.secondary}
          />
          <Button
            variant={'tertiary'}
            onPress={() => uploadVideo('gallery')}
            text={t('upload video')}
            source={upload}
            mb={10}
          />
        </>
      )}
      <Button
        variant={'tertiary'}
        onPress={() => uploadMedia('camera')}
        text={t('take photo')}
        source={camera}
      />
      <Button
        variant={'tertiary'}
        onPress={() => uploadMedia('gallery')}
        text={t('upload photo')}
        source={upload}
      />
    </Col>
  );
};
