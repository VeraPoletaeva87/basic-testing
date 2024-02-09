import axios, { AxiosResponse } from 'axios';
import { throttledGetDataFromApi } from './index';

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const url = '/guide/';
    const baseURL = 'https://jsonplaceholder.typicode.com';
    jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(url);
    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const url = '/guide/';
    const axiosSpy = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi(url);
    jest.runAllTimers();
    expect(axiosSpy).toHaveBeenCalledWith(url);
  });

  test('should return response data', async () => {
    const url = '/guide/';
    // jest.mock('axios');
    const mockedData = {
      data: [{ id: 1, value: 'mocked test data' }],
      status: 200,
      statusText: 'ok',
    } as AxiosResponse;
    const mock = jest.spyOn(axios.Axios.prototype, 'get');
    mock.mockReturnValue(Promise.resolve(mockedData));
    const result = await throttledGetDataFromApi(url);
    //jest.runAllTimers();
    expect(result).toEqual(mockedData.data);
  });
});
