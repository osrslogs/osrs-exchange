import { buildItemUrl, buildItemPriceGraphUrl, buildItemsPageUrl } from '../url';

describe('buildItemUrl', () => {
  it('returns correct url given a number', () => {
    const id = 42;
    const expected = `http://services.runescape.com/m=itemdb_oldschool/viewitem?obj=${id}`;
    const url: string = buildItemUrl(id);
    expect(url).toBe(expected);
  });
});

describe('buildItemPriceGraphUrl', () => {
  it('returns correct url given a number', () => {
    const id = 42;
    const expected = `http://services.runescape.com/m=itemdb_oldschool/api/graph/${id}.json`;
    const url: string = buildItemPriceGraphUrl(id);
    expect(url).toBe(expected);
  });
});

describe('buildItemsPageUrl', () => {
  it('returns correct url given a number', () => {
    const alpha = 'a';
    const page = 42;
    const expected = `http://services.runescape.com/m=itemdb_oldschool/api/catalogue/items.json?category=1&alpha=${alpha}&page=${page}`;
    const url: string = buildItemsPageUrl(alpha, page);
    expect(url).toBe(expected);
  });
});
