import { GetServerSideProps } from 'next';
import { PageInterface } from './page';

type BaseSSRPageDefinition = {
  [path in keyof PageInterface]: {
    query: PageInterface[path]['query'];
    props: Record<string, unknown>;
  };
};

interface SSRPageDefinition extends BaseSSRPageDefinition {
  [PageInterface.PATHS.Root]: {
    query: {};
    props: {};
  };
}

export type SSRInterface = {
  [path in keyof SSRPageDefinition]: {
    GetServerSideProps: GetServerSideProps<
      SSRPageDefinition[path]['props'],
      SSRPageDefinition[path]['query']
    >;
  };
};
