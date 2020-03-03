import cheerio from 'cheerio';
import { ItemDetails, ItemPrice, Item } from '../types';
import { cleanNumber } from '../util/utils';
import { InvalidHtmlError } from '../util/error';

/**
 * Parses item description
 *
 * @param {Cheerio} itemDescription
 *
 * @returns {ItemDetails}
 */
const parseItemDescription = (itemDescription: Cheerio): ItemDetails => {
  const icon: string = itemDescription.find('img').attr('src') || '';
  const url: URL = new URL(icon); // param 'id' of the url contains the item id
  const id: string | null = url.searchParams.get('id');

  return {
    id: Number(id),
    name: itemDescription.find('h2').text(),
    description: itemDescription.find('p').text(),
    icon,
  };
};

/**
 * Parses item prices
 *
 * @param {Cheerio} stats
 *
 * @returns {ItemPrice}
 */
const parseStats = (stats: Cheerio): ItemPrice => {
  const currentPrice = stats.find('h3 > span').attr('title') || '';

  // .stats__gp-change contains 4 elements
  // Each representing the change for today, day30, day90, day180 respectively
  const changes = stats
    .find('.stats__gp-change')
    .toArray()
    .map(element => cleanNumber(element.attribs.title));

  // TODO: validate that we got a list of 4 changes

  return {
    current: cleanNumber(currentPrice),
    change: {
      today: changes[0],
      day30: changes[1],
      day90: changes[2],
      day180: changes[3],
    },
  };
};

/**
 * Parses an item page to extract information about the item
 *
 * @param {string} itemPage Html page for the item
 *
 * @returns {Item} A representation of an item on the Grand Exchange
 *
 * @throws {InvalidHtmlError} if the html is invalid
 */
const parseItemHtml = (itemPage: string): Item => {
  const $ = cheerio.load(itemPage);

  try {
    const price: ItemPrice = parseStats($('.stats'));
    const details: ItemDetails = parseItemDescription($('.item-description'));
    const members = !!$('.item-description.member').text();

    return {
      ...details,
      members,
      price: { ...price },
    };
  } catch (err) {
    throw new InvalidHtmlError('Invalid html structure', itemPage);
  }
};

export default parseItemHtml;
