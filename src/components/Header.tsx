import HomePageIcon from '@mui/icons-material/CurrencyExchange';
import { AppBar, Toolbar, Container, Button, Stack } from '@mui/material';
import api from '../api';
import useScreenSize from '../hooks/useScreenSize';
import HeaderLink from './common/HeaderLink';
import type { UserResponse } from '../api/types';

interface HeaderProps {
  userInfo: UserResponse | null;
}

export default function Header({ userInfo }: HeaderProps) {
  const { isMobile } = useScreenSize();
  const logoSize = isMobile ? '28px' : '42px';
  const buttonSize = isMobile ? 'small' : 'medium';
  const spacing = isMobile ? 1 : 3;
  const iconMargin = isMobile ? 1 : 2;

  return (
    <AppBar position="sticky" sx={{ displayPrint: 'none' }} data-test="nav-bar">
      <Toolbar
        variant="dense"
        sx={{ padding: 1 }}
        disableGutters
        component={Container}
      >
        <Stack
          sx={{ flexGrow: 1, alignItems: 'center' }}
          direction="row"
          spacing={spacing}
        >
          <HeaderLink href="/" variant={isMobile ? 'h6' : 'h5'}>
            <HomePageIcon
              sx={{
                width: logoSize,
                height: logoSize,
                verticalAlign: 'middle',
                mr: iconMargin,
              }}
            />
            Invoicer
          </HeaderLink>
          <HeaderLink
            href="/clients"
            variant={isMobile ? 'subtitle2' : 'subtitle1'}
          >
            Clients
          </HeaderLink>
          <HeaderLink
            href="/invoices"
            variant={isMobile ? 'subtitle2' : 'subtitle1'}
          >
            Invoices
          </HeaderLink>
        </Stack>

        {userInfo && (
          <Button
            color="inherit"
            onClick={api.logout}
            size={buttonSize}
            sx={{ flexGrow: 0 }}
            data-test="logout-button"
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
