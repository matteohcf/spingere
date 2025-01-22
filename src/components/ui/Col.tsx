import { Box, BoxProps } from './Box';

export const Col = ({ children, style, ...rest }: BoxProps) => {
  return (
    <Box style={[style, { flexDirection: 'column' }]} {...rest}>
      {children}
    </Box>
  );
};
