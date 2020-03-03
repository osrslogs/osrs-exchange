import axios from 'axios';
import { mocked } from 'ts-jest/utils';
import { ItemName, Item, ItemPriceGraph, ItemDetails } from '../types';
import Exchange from '..';
import { NotFoundError } from '../util/error';
import htmlConfig from '../util/test-util/html-mock.json';
import graphConfig from '../util/test-util/graph-mock.json';
import itemPageConfig from '../util/test-util/api-item-page-mock.json';

jest.mock('axios');
const mockAxios = mocked(axios, true);
const itemId = 4151;
const itemName: ItemName = 'abyssal whip';

describe('constructor', () => {
  const defaultUserAgent = 'osrs-exchange';

  it('creates an object with UA config', () => {
    const expected = {
      userAgent: 'hello world',
    };

    const result: Exchange = new Exchange(expected);

    expect(result.config).toEqual(expected);
  });

  it('creates an object with timeout config', () => {
    const expected = {
      timeout: 123,
    };

    const result: Exchange = new Exchange(expected);

    expect(result.config.timeout).toEqual(expected.timeout);
    expect(result.config.userAgent).toEqual(defaultUserAgent);
  });

  it('creates an object with proxy config', () => {
    const expected = {
      proxy: {
        host: '123.123.123.123',
        port: 1234,
      },
    };

    const result: Exchange = new Exchange(expected);

    expect(result.config.proxy).toEqual(expected.proxy);
    expect(result.config.userAgent).toEqual(defaultUserAgent);
  });

  it('creates an object without config', () => {
    const expected = {
      userAgent: defaultUserAgent,
    };

    const result: Exchange = new Exchange();

    expect(result.config).toEqual(expected);
  });
});

describe('getItemById', () => {
  const exchange: Exchange = new Exchange();

  it('throws NotFoundError if id is not found', async () => {
    mockAxios.get.mockRejectedValueOnce({
      response: {
        status: 404,
      },
    });

    const result: Promise<Item> = exchange.getItemById(itemId);

    await expect(result).rejects.toThrow(NotFoundError);
  });

  it('returns item when the id is valid', async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: htmlConfig.validPage,
    });
    const item: Item = await exchange.getItemById(itemId);
    expect(item).toMatchSnapshot();
  });
});

describe('getItemByName', () => {
  const exchange: Exchange = new Exchange();

  it('throws NotFoundError if name is not found', async () => {
    mockAxios.get.mockRejectedValueOnce({
      response: {
        status: 404,
      },
    });

    const result: Promise<Item> = exchange.getItemByName(itemName);

    await expect(result).rejects.toThrow(NotFoundError);
  });

  it('returns item when the name is valid', async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: htmlConfig.validPage,
    });
    const item: Item = await exchange.getItemByName(itemName);
    expect(item).toMatchSnapshot();
  });

  it('throws NotFoundError if the name does not match an id', async () => {
    const result: Promise<Item> = exchange.getItemByName('invalid name' as ItemName);

    await expect(result).rejects.toThrow(NotFoundError);
  });
});

describe('getItemPriceGraphById', () => {
  const exchange: Exchange = new Exchange();

  it('throws NotFoundError if id is not found', async () => {
    mockAxios.get.mockRejectedValueOnce({
      response: {
        status: 404,
      },
    });

    const result: Promise<ItemPriceGraph> = exchange.getItemPriceGraphById(itemId);

    await expect(result).rejects.toThrow(NotFoundError);
  });

  it('returns item when the id is valid', async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: graphConfig.valid,
    });
    const result: ItemPriceGraph = await exchange.getItemPriceGraphById(itemId);
    expect(result).toMatchSnapshot();
  });
});

describe('getItemPriceGraphByName', () => {
  const exchange: Exchange = new Exchange();

  it('throws NotFoundError if id is not found', async () => {
    mockAxios.get.mockRejectedValueOnce({
      response: {
        status: 404,
      },
    });

    const result: Promise<ItemPriceGraph> = exchange.getItemPriceGraphByName(itemName);

    await expect(result).rejects.toThrow(NotFoundError);
  });

  it('returns item when the id is valid', async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: graphConfig.validTwo, // why does it have to be diff value? Does request cache previous?
    });
    const result: ItemPriceGraph = await exchange.getItemPriceGraphByName(itemName);
    expect(result).toMatchSnapshot();
  });

  it('throws NotFoundError if the name does not match an id', async () => {
    const result: Promise<ItemPriceGraph> = exchange.getItemPriceGraphByName('invalid name' as ItemName);

    await expect(result).rejects.toThrow(NotFoundError);
  });
});

describe('getItemPage', () => {
  const exchange: Exchange = new Exchange();

  it('returns item details array when valid alpha is given', async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: itemPageConfig.valid,
    });

    const result: ItemDetails[] = await exchange.getItemPage('a');

    expect(result).toMatchSnapshot();
  });

  it('returns item details array when valid alpha and page is given', async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: itemPageConfig.valid,
    });

    const result: ItemDetails[] = await exchange.getItemPage('b', 6);

    expect(result).toMatchSnapshot();
  });
});
