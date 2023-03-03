import { useEffect, useState } from "react";
import type { Options } from "redaxios";
import redaxios from "redaxios";

interface UseFetchOptions {
  skip?: boolean;
  headers?: Options["headers"];
}

interface UseFetchReturnTypes<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

function useFetch<T>(
  url: string,
  options?: UseFetchOptions
): UseFetchReturnTypes<T> {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function fetchApi() {
    setIsLoading(true);

    await redaxios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch((err: any) => {
        setError(err?.data?.message || err?.message || null);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if (options?.skip) return;

    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.skip]);

  return {
    data,
    error,
    isError: !!error,
    isLoading,
    refetch: fetchApi
  };
}

export default useFetch;
