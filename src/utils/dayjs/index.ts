import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import isBetween from 'dayjs/plugin/isBetween';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(isBetween);
dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');
dayjs.locale('ja');

/**
 * NOTE: dayjsの引数に不正な値が渡された場合にnullを返す
 */
const createSafeDayjs = (
  ...args: Parameters<typeof dayjs>
): dayjs.Dayjs | null => {
  try {
    const dayjsInstance = dayjs(...args);
    if (!dayjsInstance.isValid()) {
      throw new Error(`Invalid input / ${args}`);
    }
    return dayjsInstance;
  } catch (error) {
    return null;
  }
};

/**
 * NOTE: 日本時間を基準にしたdayjsオブジェクトを返す
 */
const createDayjsFromJapanTime = ({
  year = '2000',
  month = '01',
  day = '01',
  hour = '00',
  minute = '00',
  second = '00',
}: Partial<{
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
}> = {}) => {
  return createSafeDayjs(
    `${year}-${month}-${day}T${hour}:${minute}:${second}+09:00`
  );
};

/**
 * NOTE: ある日の開始と終了のdayjsオブジェクトを返す
 */
const getOneDayRange = (dayjsInstance: dayjs.Dayjs) => {
  const start = dayjsInstance.startOf('day');
  const end = dayjsInstance.endOf('day');
  return { start, end };
};

/**
 * NOTE: ある期間の一定間隔ごとの日にちの配列を取得する
 */
const getIntervalDaysArray = (
  startAt: dayjs.Dayjs,
  endAt: dayjs.Dayjs,
  intervalDays = 1
): dayjs.Dayjs[] => {
  const result: dayjs.Dayjs[] = [];
  let currentDate = startAt;

  while (currentDate.isBefore(endAt) || currentDate.isSame(endAt)) {
    result.push(currentDate.startOf('day'));
    currentDate = currentDate.add(intervalDays, 'day');
  }

  return result;
};

export {
  dayjs,
  createSafeDayjs,
  createDayjsFromJapanTime,
  getOneDayRange,
  getIntervalDaysArray,
};
