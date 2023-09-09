import { GetStaticProps } from 'next';
import { PageInterface } from '~/schemas/pages/page';
import { ValueOf } from '~/types/object';

type BaseSGPageDefinition = {
  [path in keyof PageInterface]: {
    props: Record<string, unknown>;
  };
};

interface SGPageDefinition extends BaseSGPageDefinition {
  [SGPageInterface.PATHS.Root]: {
    props: {};
  };
}

export type SGPageInterface = {
  [path in keyof SGPageDefinition]: {
    GetStaticProps: GetStaticProps<
      SGPageDefinition[path]['props'],
      PageInterface[path]['query']
    >;
  };
};

export namespace SGPageInterface {
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
