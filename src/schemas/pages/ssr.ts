import { GetServerSideProps } from 'next';
import { PageInterface } from '~/schemas/pages/page';
import { ValueOf } from '~/types/object';

type BaseSSRPageDefinition = {
  [path in keyof PageInterface]: {
    props: Record<string, unknown>;
  };
};

interface SSRPageDefinition extends BaseSSRPageDefinition {
  [SSRPageInterface.PATHS.Root]: {
    props: {};
  };
}

export type SSRPageInterface = {
  [path in keyof SSRPageDefinition]: {
    GetServerSideProps: GetServerSideProps<
      SSRPageDefinition[path]['props'],
      PageInterface[path]['query']
    >;
  };
};

export namespace SSRPageInterface {
  export const PATHS = {
    Root: PageInterface.PATHS.Root, // NOTE: サンプルなので定義しているが、実際は不要
  } as const satisfies Partial<
    Record<
      keyof typeof PageInterface.PATHS,
      ValueOf<typeof PageInterface.PATHS>
    >
  >;
  export type PATHS = keyof typeof PATHS;
}
