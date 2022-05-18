import RouterLink from 'next/link';
import { Link, Typography } from '@mui/material';

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
      <RouterLink href={route}>
        <Link underline="hover" variant="subtitle2" sx={{ cursor: 'pointer' }}>
          {linkText}
        </Link>
      </RouterLink>
    </Typography>
  );
}
