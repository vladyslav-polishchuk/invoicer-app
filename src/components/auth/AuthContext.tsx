import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getCookie, removeCookies, setCookies } from 'cookies-next';
import api from '../../api';
import Spinner from '../common/Spinner';

const USER_TOKEN_KEY = 'user_token';

export const AuthContext = createContext<null | {
  userToken: null | string;
  setAuthToken: (token: string) => unknown;
  logout: () => unknown;
}>(null);

export const AuthContextProvider = (props: { children: ReactNode }) => {
  const [userToken, setAuthToken] = useState<string | null>(null);
  const [isContextInitialised, setInitialised] = useState(false);

  const handleLogout = useCallback(() => {
    setAuthToken(null);
    removeCookies(USER_TOKEN_KEY);
  }, []);

  const persistToken = useCallback((token: string) => {
    api.initApi(token, handleLogout);

    setAuthToken(token);
    setCookies(USER_TOKEN_KEY, token);
  }, []);

  useEffect(() => {
    const cookieToken = getCookie(USER_TOKEN_KEY)?.toString();
    if (cookieToken) {
      api.initApi(cookieToken, handleLogout);
      setAuthToken(cookieToken);
    }

    setInitialised(true);
  }, []);

  const contextValue = useMemo(
    () => ({
      userToken,
      setAuthToken: persistToken,
      logout: handleLogout,
    }),
    [userToken]
  );

  if (!isContextInitialised) {
    return <Spinner />;
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error(`Attempted to read context value outside of provider`);
  }

  return context;
};
