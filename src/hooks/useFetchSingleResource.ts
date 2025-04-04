import { useQuery } from '@tanstack/react-query';

export const useFetchSingleResource = (url: string, keyPrefix: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [keyPrefix, url],
    queryFn: async () => {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      return data.name ?? data.title ?? 'Unknown';
    },
    enabled: !!url,
  });

  return { data, isLoading, isError };
};


