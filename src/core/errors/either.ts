export class Left<L, R> {
  readonly reason: L;

  constructor(reason: L) {
    this.reason = reason;
  }

  isLeft(): this is Left<L, R> {
    return true;
  }

  isRight(): this is Right<R, L> {
    return false;
  }
}

export class Right<R, L> {
  readonly result: R;

  constructor(result: R) {
    this.result = result;
  }

  isRight(): this is Right<R, L> {
    return true;
  }

  isLeft(): this is Left<L, R> {
    return false;
  }
}

export type Either<L, R> = Right<R, L> | Left<L, R>;

export const success = <L, R>(result: R): Either<L, R> => {
  return new Right(result);
};

export const failure = <L, R>(reason: L): Either<L, R> => {
  return new Left(reason);
};
