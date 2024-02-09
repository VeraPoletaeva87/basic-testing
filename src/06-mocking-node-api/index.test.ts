import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(() => {
      console.log('time passed');
    }, 1000);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(() => {
      console.log('time passed');
    }, 1000);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(() => {
      console.log('time passed');
    }, 1000);
    expect(setInterval).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(() => {
      console.log('time passed');
    }, 1000);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });
});

jest.mock('fs', () => ({
  existsSync: jest.fn().mockResolvedValue(true),
  readFile: jest.fn().mockImplementation(() => {
    return 'my file content';
  }),
}));

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    //
  });

  test('should return null if file does not exist', async () => {
    const result = await readFileAsynchronously('./fileThatDoesnotExist.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const result = await readFileAsynchronously('./wolf.txt');
    expect(result).toBe('my file content');
  });
});
