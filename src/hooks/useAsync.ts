import { useState, useCallback } from 'react';

export default function useAsync<T, P>(
  asyncFunction: (params: P) => Promise<T>
) {
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    (params: P) => {
      setValue(null);
      setError(null);
      return asyncFunction(params)
        .then((response: any) => {
          setValue(response);
        })
        .catch((error: Error) => {
          setError(error.message);
        });
    },
    [asyncFunction]
  );

  return { execute, value, error };
}
