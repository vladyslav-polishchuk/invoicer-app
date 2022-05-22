import Head from 'next/head';
import { ReactNode } from 'react';

interface PageProps {
  title: string;
  children: ReactNode | ReactNode[];
}

export default function Page({ title, children }: PageProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      {children}
    </>
  );
}
