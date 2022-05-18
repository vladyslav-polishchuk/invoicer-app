import { Grid } from '@mui/material';
import Footer from './Footer';
import Header from './Header';
import { ReactNode, useCallback, useEffect } from 'react';
import api from '../api';
import useAsync from '../hooks/useAsync';
import { useDispatch, useSelector } from 'react-redux';
import { type InvoiceAppState, setToken, setUser } from '../store';
import Spinner from './common/Spinner';
import { UserResponse } from '../api/api';
import { getCookie, removeCookies } from 'cookies-next';

const USER_TOKEN_KEY = 'user_token';

export default function AppContainer({ children }: { children: ReactNode }) {
  const { user, token } = useSelector((store: InvoiceAppState) => store);
  const dispatch = useDispatch();
  const { execute, value: userInfo } = useAsync<UserResponse, undefined>(
    api.getCompanyDetails
  );

  useEffect(() => {
    if (userInfo) {
      dispatch(setUser(userInfo));
    }
  }, [userInfo]);

  useEffect(() => {
    if (token) {
      api.initApi(token, handleLogout);
      execute(undefined);
    }
  }, [token]);

  const handleLogout = useCallback(() => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    removeCookies(USER_TOKEN_KEY);
  }, []);

  useEffect(() => {
    const cookieToken = getCookie(USER_TOKEN_KEY)?.toString();
    if (cookieToken) {
      dispatch(setToken(cookieToken));
    }
  }, []);

  if (token && !user) {
    return <Spinner />;
  }

  return (
    <Grid
      container
      direction="column"
      sx={{ minHeight: '100vh', backgroundColor: '#f2f3f4' }}
    >
      <Header userInfo={userInfo} />
      {children}
      <Footer />
    </Grid>
  );
}
