import { describe, test, expect } from '@jest/globals';
import { dayjs, createDayjsFromJapanTime } from '~/utils/dayjs';

describe('createDayjsFromJapanTime', () => {
  test('与えられた日本時間に対して正しいdayjsオブジェクト（UTC）を返す', () => {
    const input = {
      year: '2023',
      month: '07',
      day: '04',
      hour: '12',
      minute: '30',
      second: '30',
    };

    const result = createDayjsFromJapanTime(input);
    const expected = dayjs('2023-07-04T12:30:30+09:00').utc();

    expect(result?.isSame(expected)).toBe(true);
  });

  test('与えられた日本時間に対して正しいdayjsオブジェクト（ローカル時間）を返す', () => {
    const input = {
      year: '2023',
      month: '07',
      day: '04',
      hour: '12',
      minute: '30',
      second: '30',
    };

    const result = createDayjsFromJapanTime(input);
    const expected = dayjs('2023-07-04T03:30:30+00:00').utc();

    expect(result?.isSame(expected)).toBe(true);
  });

  test('デフォルトの日本時間に対して正しいdayjsオブジェクトを返す', () => {
    const result = createDayjsFromJapanTime({});
    const expected = dayjs('2000-01-01T00:00:00+09:00').utc();

    expect(result?.isSame(expected)).toBe(true);
  });
});
