export type ChallengeResult<T> =
  | {
      data: T;
      success: true;
      failureReason?: undefined;
    }
  | {
      data: null;
      success: false;
      failureReason: string;
    };

export type Many<T> = {
  items: T[];
  size: number;
  page: number;
  total: number;
};

export type ErrorResult = {
  httpStatus: number;
  message: string;
};
