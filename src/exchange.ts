import { Config, Item, ItemName, ItemPriceGraph, ItemDetails, ApiItemPage } from './types';
import request from './request';
import { buildItemUrl, buildItemPriceGraphUrl, buildItemsPageUrl } from './util/url';
import parseItemHtml from './parser/item-html';
import { NotFoundError } from './util/error';
import { getItemId } from './util/utils';
import parseItemPriceGraph from './parser/item-graph';
import parseItemPage from './parser/item-page';

class Exchange {
  readonly config: Config = {};

  constructor(config?: Config) {
    this.config = { ...this.config, ...config };
  }

  /**
   * Fetches the item details for the given item id.
   *
   * @param {number} id
   *
   * @returns {Item}
   *
   * @throws {} If ....
   */
  async getItemById(id: number): Promise<Item> {
    const url: string = buildItemUrl(id);
    const html: string = (await request(url, this.config)) as string;
    return parseItemHtml(html);
  }

  /**
   * Fetches the item details for the given item name.
   *
   * @param {ItemName} name The name of the item
   *
   * @returns {Item}
   *
   * @throws {} If ....
   */
  async getItemByName(name: ItemName): Promise<Item> {
    const id: number | undefined = getItemId(name);

    if (id) {
      return this.getItemById(id);
    }

    throw new NotFoundError('Unable to find item with the given name');
  }

  /**
   * Fetches the item graph for the given item id.
   *
   * @param {number} id
   *
   * @returns {void}
   */
  async getItemPriceGraphById(id: number): Promise<ItemPriceGraph> {
    const url: string = buildItemPriceGraphUrl(id);
    const graph: ItemPriceGraph = (await request(url, this.config)) as ItemPriceGraph;
    return parseItemPriceGraph(graph);
  }

  /**
   * Fetches the item graph for the given item name.
   *
   * @param {ItemName} name The name of the item
   *
   * @returns {void}
   */
  async getItemPriceGraphByName(name: ItemName): Promise<ItemPriceGraph> {
    const id: number | undefined = getItemId(name);

    if (id) {
      return this.getItemPriceGraphById(id);
    }

    throw new NotFoundError('Unable to find item with the given name');
  }

  /**
   * Fetches item details pages for the given page number and first character of the item.
   * Prices are excluded as they are inaccurate for numbers > 10000. Use `getItemById` instead.
   *
   * @param {string} alpha The first character of an item. A-Z, length 1.
   * @param {number} [page] The page number to request, defaults to `1`.
   *
   * @returns {void}
   */
  async getItemPage(alpha: string, page = 1): Promise<ItemDetails[]> {
    const url = buildItemsPageUrl(alpha, page);
    const response = await request(url, this.config);
    return parseItemPage(response as ApiItemPage);
  }
}

export default Exchange;
