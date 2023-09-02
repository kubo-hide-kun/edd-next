import { describe, test, expect } from '@jest/globals';
import { createDynamicUrl } from './index';

describe('createDynamicUrl', () => {
  test('適切なダイナミックURLが生成されている(単体)', () => {
    const baseUrl = '/api/posts/[postId]';
    const query = {
      postId: '1000',
      userId: '2000',
      token: 'xxx',
    };

    const url = createDynamicUrl(baseUrl, query);
    const expected = '/api/posts/1000?userId=2000&token=xxx';

    expect(url).toEqual(expected);
  });

  test('適切なダイナミックURLが生成されている(複数)', () => {
    const baseUrl = '/api/posts/[postId]/[userId]';
    const query = {
      postId: '1000',
      userId: '2000',
      token: 'xxx',
    };

    const url = createDynamicUrl(baseUrl, query);
    const expected = '/api/posts/1000/2000?token=xxx';

    expect(url).toEqual(expected);
  });

  test('適切なダイナミックURLが生成されている(クエリが存在ししない場合)', () => {
    const baseUrl = '/api/posts';

    const url = createDynamicUrl(baseUrl);
    const expected = '/api/posts';

    expect(url).toEqual(expected);
  });

  test('適切なダイナミックURLが生成されている(クエリが空オブジェクトの場合)', () => {
    const baseUrl = '/api/posts';
    const query = {};

    const url = createDynamicUrl(baseUrl, query);
    const expected = '/api/posts';

    expect(url).toEqual(expected);
  });

  test('適切なダイナミックURLが生成されている(クエリ内の値が undefined のみの場合)', () => {
    const baseUrl = '/api/posts';
    const query = {
      token: undefined,
    };

    const url = createDynamicUrl(baseUrl, query);
    const expected = '/api/posts';

    expect(url).toEqual(expected);
  });

  test('適切なダイナミックURLが生成されている(クエリ内の値に undefined と 空文字 が存在する場合)', () => {
    const baseUrl = '/api/posts';
    const query = {
      userId: '1000',
      token1: undefined,
      token2: '',
    };

    const url = createDynamicUrl(baseUrl, query);
    const expected = '/api/posts?userId=1000';

    expect(url).toEqual(expected);
  });

  test('適切なダイナミックURLが生成されている(クエリ内の値が null の場合)', () => {
    const baseUrl = '/api/posts';
    const query = {
      token: null,
    };

    const url = createDynamicUrl(baseUrl, query);
    const expected = '/api/posts?token=null';

    expect(url).toEqual(expected);
  });

  test('適切なダイナミックURLが生成されている(URL部が undefined の場合)', () => {
    const baseUrl = '/api/posts/[postId]';
    const query = {
      postId: undefined,
    };

    const url = createDynamicUrl(baseUrl, query);
    const expected = '/api/posts/[postId]';

    expect(url).toEqual(expected);
  });

  test('適切なダイナミックURLが生成されている(URL部が 空文字 の場合)', () => {
    const baseUrl = '/api/posts/[postId]';
    const query = {
      postId: '',
    };

    const url = createDynamicUrl(baseUrl, query);
    const expected = '/api/posts/[postId]';

    expect(url).toEqual(expected);
  });
});
