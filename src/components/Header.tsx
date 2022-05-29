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
import type { UserResponse } from '../api/api';

interface HeaderProps {
  userInfo: UserResponse | null;
}

export default function Header({ userInfo }: HeaderProps) {
  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar variant="dense" sx={{ padding: 1 }} disableGutters>
          <Link href="/">
            <Typography
              component="a"
              href="/"
              variant="h5"
              color="inherit"
              fontWeight="bold"
              sx={{ textDecoration: 'none', flexGrow: '1' }}
            >
              <HomePageIcon
                sx={{
                  width: '42px',
                  height: '42px',
                  verticalAlign: 'middle',
                  mr: 2,
                }}
              />
              Invoicer
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 0 }}>
            <Link href="/login">
              <Button color="inherit">Login</Button>
            </Link>
            <Link href="/signup">
              <Button color="inherit">Sign-up</Button>
            </Link>
            <Link href="/company-details">
              <Button color="inherit">Company Details</Button>
            </Link>

            <Button color="inherit" onClick={api.logout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
