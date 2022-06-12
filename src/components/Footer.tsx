import { Container, Typography } from '@mui/material';
import useScreenSize from '../hooks/useScreenSize';

export default function Footer() {
  const { isMobile } = useScreenSize();
  const copyrightTextVariant = isMobile ? 'caption' : 'body2';
  const padding = isMobile ? 1 : 2;

  return (
    <Container
      sx={{ py: padding, mt: 'auto', displayPrint: 'none', zIndex: 1 }}
      component="footer"
    >
      <Typography
        variant={copyrightTextVariant}
        align="center"
        color="text.secondary"
      >
        © Copyright 2022 Vladyslav Polishchuk. All rights reserved
      </Typography>
    </Container>
  );
}
