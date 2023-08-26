import { NextPage } from 'next';
import { ReactElement } from 'react';

export type LayoutGetter = (page: ReactElement) => ReactElement;

export type NextPageWithLayout<Props = {}> = NextPage<Props> & {
  getLayout?: LayoutGetter;
};
