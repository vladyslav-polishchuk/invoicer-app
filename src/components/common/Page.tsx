import { Box } from '@mui/material';
import Head from 'next/head';
import { ReactNode } from 'react';
import BackgroundImage from './backgroundImage';

interface PageProps {
  title: string;
  children: ReactNode;
}

export default function Page({ title, children }: PageProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <BackgroundImage />

      <Box sx={{ width: '100%', height: '100%', zIndex: 1 }}>{children}</Box>
    </>
  );
}
