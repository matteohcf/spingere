import { Box, BoxProps } from './Box';

export const Row = ({ children, style, ...rest }: BoxProps) => {
  return (
    <Box {...rest} style={[style, { flexDirection: 'row' }]}>
      {children}
    </Box>
  );
};
