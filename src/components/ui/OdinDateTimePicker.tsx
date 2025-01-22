import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { IS_ANDROID } from '../../utils/platform';
import DatePickerIos from 'react-native-date-picker';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';

type Props = {
  value: Date | string | undefined;
  mode: 'date' | 'time' | 'datetime' | undefined;
  show: boolean;
  onchangeShow: (show: boolean) => void;
  onChange: (value: string) => void;
};

export const OdinDateTimePicker = ({ value: passedValue, mode: passedMode, onChange, show, onchangeShow }: Props) => {
  const { t } = useTranslation();
  const [mode, setMode] = React.useState(passedMode);
  const [androidDate, setAndroidDate] = React.useState<DateTime | null>(null);

  const value = useMemo(() => {
    if (typeof passedValue === 'string') {
      return DateTime.fromISO(passedValue).toJSDate();
    }
    return passedValue;
  }, [passedValue]);

  return (
    <>
      {show && (
        <>
          {IS_ANDROID && (
            <DateTimePicker
              testID="dateTimePicker"
              value={value || new Date()}
              mode={mode === 'datetime' || mode === 'date' ? 'date' : 'time'}
              is24Hour={true}
              display="default"
              onChange={v => {
                onchangeShow(false);
                console.log({ v });
                if (v.type === 'set') {
                  if (mode === 'datetime') {
                    setAndroidDate(DateTime.fromMillis(v.nativeEvent.timestamp));
                    setMode('time');
                    setTimeout(() => {
                      onchangeShow(true);
                    }, 100);
                  } else {
                    if (androidDate) {
                      const dateTimeSum = androidDate.startOf('day').plus({
                        hour: DateTime.fromMillis(v.nativeEvent.timestamp).toFormat('HH'),
                        minute: DateTime.fromMillis(v.nativeEvent.timestamp).toFormat('mm'),
                      });
                      setMode('datetime');
                      onChange(dateTimeSum.toISO());
                      return;
                    }
                    onChange(DateTime.fromMillis(v.nativeEvent.timestamp).toISO());
                  }
                }
                if (v.type === 'dismissed') {
                  androidDate(null);
                  setMode(mode);
                  setAndroidDate(null);
                }
              }}
            />
          )}
          {!IS_ANDROID && (
            <DatePickerIos
              minuteInterval={15}
              modal
              mode={mode}
              title={t('select date')}
              confirmText={t('confirm')}
              cancelText={t('cancel')}
              open={show}
              theme={'light'}
              // minimumDate={formatDate(minDate)}
              // maximumDate={formatDate(maxDate)}
              date={value || new Date()}
              onConfirm={date => {
                console.log({ dateIOS: date });
                onchangeShow(false);
                onChange(DateTime.fromJSDate(date).toISO());
              }}
              onCancel={() => {
                onchangeShow(false);
              }}
            />
          )}
        </>
      )}
    </>
  );
};
