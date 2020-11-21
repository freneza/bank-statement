import useSWR from 'swr';
import api from '../api';

export function useFetch<Data = any, Error = any>(
  url: string
): { data: Data; error: Error } {
  const { data, error } = useSWR<Data, Error>(url, async (url) => {
    const response = await api.get(url);
    return response.data;
  });

  return { data, error };
}
