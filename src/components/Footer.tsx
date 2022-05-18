import { Container, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Container sx={{ py: 2, mt: 'auto' }} component="footer">
      <Typography variant="body2" align="center" color="text.secondary">
        © Copyright 2022 Vladyslav Polishchuk. All rights reserved
      </Typography>
    </Container>
  );
}
