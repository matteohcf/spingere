import React, { useCallback, useEffect, useState } from 'react';
import { Col } from '../Col';
import { FlatList, Keyboard, KeyboardEvent, RefreshControl, StyleSheet } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { Theme } from '../../../types';
import { useStylesheet } from '../../../hooks/useStylesheet';
import { GenericFormElement } from './GenericFormElement';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import { Report, ReportTypes, VerbalsStatus, WarningStatus } from '../../../types/report';
import { InputSearch } from '../InputSearch';
import { Separator } from '../Separator';
import { ListEmptyComponent } from '../ListEmptyComponent';
import { useTranslation } from 'react-i18next';
import { Row } from '../Row';
import { getChildrenFromReport, signReport } from '../../../api/reports';
import { Button } from '../Button';
import { useFocusEffect } from '@react-navigation/native';
import { TemplateFormFooter } from './TemplateFormFooter';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../../store/user';

type Props = {
  report: Report;
  fromCourses?: boolean;
  onPressShowConnect: () => void;
  url: string;
  navigation: any;
};
type Filters = {};

export const TemplateForm = ({ report, onPressShowConnect, url, fromCourses = false, navigation }: Props) => {
  const { spacing, insets } = useTheme();
  const userId = useSelector(userSelectors.id);
  const [search, setSearch] = useState<string>('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [loadingSign, setLoadingSign] = useState(false);
  const styles = useStylesheet(createStyles);
  const { t } = useTranslation();
  const [connectedReports, setConnectedReports] = useState<Report[]>([]);
  const isConcluded = report.reportType === ReportTypes.WARNING && report.status === WarningStatus.COMPILED;
  const waitingMySign = report.status === VerbalsStatus.WAITING_SIGNS && report.waitingMySign;
  const isMyReport = report.userId === userId;

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', (e: KeyboardEvent) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      getChildrenFromReport(report._id).then(res => {
        setConnectedReports(res);
      });
    }, [report._id]),
  );

  const onPressSign = useCallback(async () => {
    setLoadingSign(true);
    const signed = await signReport({ reportId: report._id, navigation });
    console.log({ signed });
    setLoadingSign(false);
  }, [navigation, report._id]);

  const { hasNextPage, refetch, ...infiniteScrollProps } = useInfiniteScroll<Report[], Filters>({
    key: `questions-${report._id}`,
    url: url,
    limit: 10,
    filters: { q: search || undefined },
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const disableCompilation = isConcluded || waitingMySign || !isMyReport;

  console.log({ infiniteScrollPropsQuestions: infiniteScrollProps });
  return (
    <Col flex={1}>
      <Row ph={spacing.screenHorizontal}>
        <InputSearch value={search} onChangeText={setSearch} />
      </Row>
      <FlatList
        key={`questions-${report._id}`}
        refreshControl={<RefreshControl refreshing={false} onRefresh={refetch} />}
        {...infiniteScrollProps}
        ListFooterComponent={
          hasNextPage ? infiniteScrollProps.ListFooterComponent : <TemplateFormFooter report={report} />
        }
        style={styles.flatList}
        contentContainerStyle={[styles.contentContainer, { paddingBottom: keyboardHeight + insets.safeBottom + 60 }]}
        renderItem={({ item }) => (
          <GenericFormElement
            fromCourses={fromCourses}
            disabled={disableCompilation}
            question={item}
            reportId={report._id}
          />
        )}
        ItemSeparatorComponent={() => <Separator pv={15} ph={15} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<ListEmptyComponent text={t('there are no questions')} />}
        ListHeaderComponent={() => {
          if (!connectedReports.length) {
            return null;
          }
          return (
            <Row ph={spacing.screenHorizontal}>
              <Button text={t('show connected non compliance')} mb={10} w={'100%'} onPress={onPressShowConnect} />
            </Row>
          );
        }}
      />
      {waitingMySign && (
        <Row alignItems={'center'} justifyContent={'center'} style={styles.signButtonContainer}>
          <Button text={t('sign')} style={styles.signButton} onPress={onPressSign} loading={loadingSign} />
        </Row>
      )}
    </Col>
  );
};

const createStyles = ({ spacing, insets }: Theme) =>
  StyleSheet.create({
    flatList: {
      height: '100%',
    },
    contentContainer: {
      paddingTop: spacing.screenVertical,
      paddingBottom: 200,
    },
    signButtonContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      marginBottom: insets.safeBottom,
    },
    signButton: {
      borderRadius: 40,
      height: 40,
      width: 120,
    },
  });
