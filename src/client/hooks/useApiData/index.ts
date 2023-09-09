import useSWR, { SWRConfiguration } from 'swr';
import { GetApiInterface } from '~/schemas/apis/get';
import { ErrorResult } from '~/types/api';
import { createDynamicUrl } from '~/utils/url';

export const useGetApiData = <T extends keyof GetApiInterface>(
  key: T,
  {
    query,
    requestInit,
    inPreparation,
    config,
  }: {
    query?: GetApiInterface[T]['query'];
    requestInit?: RequestInit;
    inPreparation?: boolean;
    config?: SWRConfiguration;
  } = {}
) => {
  const url = createDynamicUrl(key, query);
  return useSWR<GetApiInterface[T]['response'] | undefined, ErrorResult>(
    url,
    async (): Promise<GetApiInterface[T]['response'] | undefined> => {
      if (inPreparation) {
        return undefined;
      }
      const response = await fetch(url, requestInit);
      const { data, error } = (await response.json()) ?? {};

      if (error) {
        throw error;
      }

      return data;
    },
    config
  );
};
