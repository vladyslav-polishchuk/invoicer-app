import { useState, useCallback } from 'react';

export default function useAsync<T, P>(
  asyncFunction: (params: P) => Promise<T>
) {
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'success' | 'error'
  >('idle');
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    (params: P) => {
      setStatus('pending');
      setValue(null);
      setError(null);
      return asyncFunction(params)
        .then((response: any) => {
          setValue(response);
          setStatus('success');
        })
        .catch((error: Error) => {
          setError(error.message);
          setStatus('error');
        });
    },
    [asyncFunction]
  );

  return { execute, status, value, error };
}
