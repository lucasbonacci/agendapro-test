import { useQueries } from '@tanstack/react-query';

export const useFetchMultipleResources = (urls: string[], keyPrefix: string) => {
  const queries = useQueries({
    queries: urls.map(url => ({
      queryKey: [keyPrefix, url],
      queryFn: async () => {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();
        return data.name ?? data.title ?? 'Unknown';
      },
      enabled: !!urls.length,
    })),
  });

  const data = queries.map(q => q.data).filter(Boolean) as string[];
  const isLoading = queries.some(q => q.isLoading);
  const isError = queries.some(q => q.isError);

  return { data, isLoading, isError };
};
