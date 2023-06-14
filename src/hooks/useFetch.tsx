import { useCallback, useState } from 'react';

import { TypeData } from '../types/TypeData';


function useFetch() {
  const [data, setData] = useState<TypeData>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const request = useCallback(async (url: string, options: RequestInit) => {
    let response;
    let json;

    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();
      console.log('response',response);
      console.log('json',json);
      

      if (!response.ok) throw new Error(json.message);
    } catch (err) {
      if (err instanceof Error) {
        json = null;
        setError(err.message);
      }
    }

    setData(json);
    setLoading(false);

    return { response, json };
  }, []);

  return { data, loading, error, request };
}

export default useFetch;
