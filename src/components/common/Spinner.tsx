import { Backdrop, CircularProgress, Typography } from '@mui/material';

export default function Spinner() {
  return (
    <Backdrop
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      open
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Please wait while we prepare things for you
      </Typography>
      <CircularProgress size={60} />
    </Backdrop>
  );
}
