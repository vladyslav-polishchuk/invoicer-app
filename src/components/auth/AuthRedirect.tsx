import Link from 'next/link';
import { Typography } from '@mui/material';

interface AuthRedirectProps {
  title: string;
  linkText: string;
  route: string;
}

export default function AuthRedirect({
  title,
  linkText,
  route,
}: AuthRedirectProps) {
  return (
    <Typography variant="body2" align="center" sx={{ mt: 3 }}>
      {title}{' '}
      <Link href={route}>
        <Typography
          component="a"
          href={route}
          color="primary"
          variant="subtitle2"
          sx={{ cursor: 'pointer', textDecoration: 'none' }}
        >
          {linkText}
        </Typography>
      </Link>
    </Typography>
  );
}
