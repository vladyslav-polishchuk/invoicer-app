import { useRouter } from 'next/router';

export default function useRouterQuery() {
  const { query } = useRouter();

  return Object.entries(query).reduce((acc, entry) => {
    const [key, value] = entry;
    acc[key] = Array.isArray(value) ? value[0] : value;
    return acc;
  }, {} as Record<string, string | undefined>);
}
