import HomePageIcon from '@mui/icons-material/CurrencyExchange';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
} from '@mui/material';
import api from '../api';
import useScreenSize from '../hooks/useScreenSize';
import type { UserResponse } from '../api/types';

interface HeaderProps {
  userInfo: UserResponse | null;
}

export default function Header({ userInfo }: HeaderProps) {
  const { isMobile } = useScreenSize();
  const logoSize = isMobile ? '28px' : '42px';
  const buttonSize = isMobile ? 'small' : 'medium';

  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar variant="dense" sx={{ padding: 1 }} disableGutters>
          <Link href="/">
            <Typography
              component="a"
              href="/"
              variant={isMobile ? 'h6' : 'h5'}
              color="inherit"
              fontWeight="bold"
              sx={{ textDecoration: 'none', flexGrow: '1' }}
            >
              <HomePageIcon
                sx={{
                  width: logoSize,
                  height: logoSize,
                  verticalAlign: 'middle',
                  mr: 2,
                }}
              />
              Invoicer
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 0 }}>
            {!userInfo && (
              <Link href="/login">
                <Button color="inherit" size={buttonSize}>
                  Login
                </Button>
              </Link>
            )}
            {!userInfo && (
              <Link href="/signup">
                <Button color="inherit" size={buttonSize}>
                  Sign-up
                </Button>
              </Link>
            )}
            {userInfo && (
              <Link href="/company-details">
                <Button color="inherit" size={buttonSize}>
                  Company Details
                </Button>
              </Link>
            )}
            {userInfo && (
              <Button color="inherit" onClick={api.logout} size={buttonSize}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
