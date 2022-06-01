import { createTheme, Grid, ThemeProvider } from '@mui/material';
import Footer from './Footer';
import Header from './Header';
import { ReactNode, useEffect } from 'react';
import api from '../api';
import useAsync from '../hooks/useAsync';
import { useDispatch, useSelector } from 'react-redux';
import { type InvoiceAppState, setUser } from '../store';
import Spinner from './common/Spinner';
import { useAuthContext } from './auth/AuthContext';

const theme = createTheme({});

export default function AppContainer({ children }: { children: ReactNode }) {
  const { userToken } = useAuthContext();
  const { user } = useSelector((store: InvoiceAppState) => store);
  const dispatch = useDispatch();
  const { execute, value: userInfo } = useAsync(api.getCompanyDetails);

  useEffect(() => {
    if (userInfo) {
      dispatch(setUser(userInfo));
    }
  }, [userInfo]);

  useEffect(() => {
    if (userToken) {
      execute(undefined);
    } else if (user) {
      dispatch(setUser(null));
    }
  }, [userToken]);

  if (userToken && !user) {
    return <Spinner />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="column"
        sx={{ minHeight: '100vh', backgroundColor: '#f2f3f4' }}
      >
        <Header userInfo={user} />
        {children}
        <Footer />
      </Grid>
    </ThemeProvider>
  );
}
