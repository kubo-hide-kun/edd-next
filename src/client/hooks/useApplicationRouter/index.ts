import { useRouter } from 'next/router';
import { PageInterface } from '~/schemas/pages/page';
import { createDynamicUrl } from '~/utils/url';

export const useApplicationRouter = (key: keyof PageInterface) => {
  const router = useRouter();

  const query = router.query as PageInterface[typeof key]['query'] & {
    [key: string]: string | undefined;
  };

  const push = async <T extends keyof PageInterface>(
    path: T,
    args: {
      query?: PageInterface[T]['query'];
    }
  ) => {
    const url = createDynamicUrl(path, args.query);
    const result = await router.push(url);
    return result;
  };

  const replace = async <T extends keyof PageInterface>(
    path: T,
    args: {
      query?: PageInterface[T]['query'];
    }
  ) => {
    const url = createDynamicUrl(path, args.query);
    const result = await router.replace(url);
    return result;
  };

  const prefetch = async <T extends keyof PageInterface>(
    path: T,
    args: {
      query?: PageInterface[T]['query'];
    }
  ) => {
    const url = createDynamicUrl(path, args.query);
    const result = await router.prefetch(url);
    return result;
  };

  return {
    query,
    events: router.events,
    isFallback: router.isFallback,
    isReady: router.isReady,
    isPreview: router.isPreview,
    push,
    replace,
    prefetch,
    reload: router.reload,
    back: router.back,
    forward: router.forward,
  };
};
