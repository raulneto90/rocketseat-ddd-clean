import { Either, failure, success } from './either';

function doSomething(shouldSuccess: boolean): Either<string, string> {
  if (shouldSuccess) {
    return success('Operation successful');
  }
  return failure('Operation failed');
}

describe('Either', () => {
  it('should create a success response', () => {
    const result = doSomething(true);

    if (result.isRight()) {
      expect(result.result).toBe('Operation successful');
    }

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
  });

  it('should create a failure response', () => {
    const result = doSomething(false);

    if (result.isLeft()) {
      expect(result.reason).toBe('Operation failed');
    }

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
  });
});
