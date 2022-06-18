import { Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

interface HeaderLinkProps {
  children: ReactNode;
  href: string;
  variant: 'h5' | 'h6' | 'subtitle1' | 'subtitle2';
}

export default function HeaderLink(props: HeaderLinkProps) {
  const router = useRouter();
  const { children, href, variant } = props;
  const testAttribute = href === router.pathname ? { 'data-active': true } : {};

  return (
    <Link href={href}>
      <Typography
        component="a"
        href={href}
        color="inherit"
        variant={variant}
        sx={{ textDecoration: 'none' }}
        fontWeight="bold"
        {...testAttribute}
      >
        {children}
      </Typography>
    </Link>
  );
}
