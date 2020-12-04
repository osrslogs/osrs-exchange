import axios, { AxiosRequestConfig } from 'axios';
import { NotFoundError, HttpError, ServiceUnavailableError } from './util/error';
import { Config } from './types';

/**
 * Builds the Axios Config with needed properties
 *
 * @param {Config} config The config to use for the request
 *
 * @returns {AxiosRequestConfig}
 */
const buildAxiosConfig = (config: Config): AxiosRequestConfig => ({
  headers: {
    'user-agent': config.userAgent
      ? config.userAgent
      : 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1',
    accept: 'text/html',
    'accept-encoding': 'gzip',
  },
  proxy: config.proxy,
  timeout: config.timeout,
  responseType: 'text',
});

/**
 * Fetches a OSRS Exchange url and returns the contents
 *
 * @param {string} url The url to fetch
 * @param {Config} config The config to use for the request
 *
 * @returns {string} The page content
 *
 * @throws {ServiceUnavailableError} If exchange is unavailable
 * @throws {NotFoundError} If exchange did not find item
 * @throws {HttpError} If exchange request failed unexpectedly
 */
const request = async (url: string, config: Config): Promise<unknown> => {
  const axiosConfig = buildAxiosConfig(config);
  try {
    const res = await axios.get(url, axiosConfig);
    return res.data;
  } catch (err) {
    // TOOD: Verify response code / redirects when exchange is unavailable || err.response.status === 303
    if (err.code === 'ECONNABORTED') {
      throw new ServiceUnavailableError('Exchange is unavailable');
    }
    if (err.response.status === 404) {
      throw new NotFoundError('Exchange did not find item');
    }
    // should never occur
    throw new HttpError('Exchange unexpected error');
  }
};

export default request;
