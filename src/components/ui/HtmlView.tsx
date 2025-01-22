import { StyleSheet, useWindowDimensions } from 'react-native';
import RenderHTML, { RenderHTMLProps } from 'react-native-render-html';
import { useTheme } from '../../hooks/useTheme';
import { useStylesheet } from '../../hooks/useStylesheet';
import { Theme } from '../../types';

export const HtmlView = (props: RenderHTMLProps) => {
  const { colors, spacing, fontSizes } = useTheme();
  const { width } = useWindowDimensions();
  const styles = useStylesheet(createStyles);

  return (
    <RenderHTML
      contentWidth={width}
      defaultTextProps={{
        selectable: true,
        selectionColor: colors.secondary,
      }}
      systemFonts={['Montserrat']}
      {...props}
      baseStyle={{
        padding: spacing[4],
        color: 'grey',
        fontFamily: 'Montserrat',
        fontSize: fontSizes.md,
        ...(props.baseStyle ?? {}),
      }}
      tagsStyles={{
        p: styles.paragraph,
        b: styles.bold,
      }}
      ignoredStyles={['fontFamily', 'color', 'backgroundColor', 'width', 'height']}
    />
  );
};

const createStyles = ({ spacing }: Theme) =>
  StyleSheet.create({
    paragraph: { marginBottom: spacing[0], marginTop: spacing[3] },
    bold: { fontWeight: '800' },
  });
