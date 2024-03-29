import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Head from 'next/head';
import { Provider as ReduxStoreProvider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { store as reduxStore } from '../src/redux';
import AppContainer from '../src/components/AppContainer';
import ErrorBoundary from '../src/components/ErrorBoundary';
import { AuthContextProvider } from '../src/components/auth/AuthContext';
import { MobXStoreProvider, mobxStore } from '../src/mobx';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <CssBaseline />

      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="App to handle invoices" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthContextProvider>
        <ReduxStoreProvider store={reduxStore}>
          <MobXStoreProvider store={mobxStore}>
            <AppContainer>
              <Component {...pageProps} />
            </AppContainer>
          </MobXStoreProvider>
        </ReduxStoreProvider>
      </AuthContextProvider>
    </ErrorBoundary>
  );
}
