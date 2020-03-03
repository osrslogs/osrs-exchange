const BASE_URL = 'http://services.runescape.com/m=itemdb_oldschool';

export const buildItemsPageUrl = (alpha: string, page: number): string => {
  return `${BASE_URL}/api/catalogue/items.json?category=1&alpha=${alpha}&page=${page}`;
};

export const buildItemPriceGraphUrl = (id: number): string => {
  return `${BASE_URL}/api/graph/${id}.json`;
};

/**
 * Builds the item url for the given item id. Note: It will redirect 302->200
 * due to not providing the name in the URL.
 *
 * @param {number} id The id of the item to lookup
 *
 * @returns {string} The url
 */
export const buildItemUrl = (id: number): string => {
  return `${BASE_URL}/viewitem?obj=${id}`;
};
