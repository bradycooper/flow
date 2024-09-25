import { useState, useEffect } from "react";

interface FetchResponse<T> {
  data: T | null;
  loading: boolean;
  error: boolean | string | unknown;
}

const useFetch = <T>(url: string): FetchResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | unknown>(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error("Could not fetch data from server");
        }
        const result: T = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        if (signal.aborted) {
          console.log("Fetch aborted");
        } else {
          setLoading(false);
          setError(err);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
