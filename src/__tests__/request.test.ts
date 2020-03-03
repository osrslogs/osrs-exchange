import axios from 'axios';
import { mocked } from 'ts-jest/utils';
import request from '../request';
import { NotFoundError, HttpError } from '../util/error';

jest.mock('axios');

describe('request', () => {
  const mockAxios = mocked(axios, true);
  const url = '';
  const config = {};

  it('returns string on success with empty config', async () => {
    const expected = 'hello world';
    mockAxios.get.mockResolvedValueOnce({ data: expected });
    const result = request(url, config);
    await expect(result).resolves.toBe(expected);
  });

  it('returns string on success with ua config', async () => {
    const expected = 'hello world';
    const uaConfig = { userAgent: expected };
    mockAxios.get.mockResolvedValueOnce({ data: expected });
    const result = request(url, uaConfig);
    await expect(result).resolves.toBe(expected);
  });

  /*
  it('throws ServiceUnavailableError on status 303', async () => {
    mockAxios.get.mockRejectedValueOnce({
      response: {
        status: 303,
      },
    });
    const result = request(url, config);
    await expect(result).rejects.toThrow(ServiceUnavailableError);
  });
  */

  it('throws NotFoundError on status 404', async () => {
    mockAxios.get.mockRejectedValueOnce({
      response: {
        status: 404,
      },
    });
    const result = request(url, config);
    await expect(result).rejects.toThrow(NotFoundError);
  });

  it('throws HttpError on unexpected status code', async () => {
    mockAxios.get.mockRejectedValueOnce({
      response: {
        status: 500,
      },
    });
    const result = request(url, config);
    await expect(result).rejects.toThrow(HttpError);
  });
});
