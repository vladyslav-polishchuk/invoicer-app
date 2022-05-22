import NotFoundImage from '../images/not-found.svg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';
import { Box, Button, Typography } from '@mui/material';
import Page from '../src/components/common/Page';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Page title="Not Found">
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          mt: 5,
        }}
      >
        <Typography
          align="center"
          color="textPrimary"
          variant="h4"
          sx={{ fontWeight: 'bold' }}
        >
          The page you are looking for isn’t here
        </Typography>
        <Box sx={{ textAlign: 'center' }} height="50vh">
          <Image alt="" src={NotFoundImage} height="400px" width="400px" />
        </Box>
        <Link href="/">
          <Button
            startIcon={<ArrowBackIcon fontSize="small" />}
            sx={{ my: 5 }}
            variant="contained"
          >
            Go Home
          </Button>
        </Link>
      </Box>
    </Page>
  );
}
