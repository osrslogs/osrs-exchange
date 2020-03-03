import jsonItems from './data/items.json';
import { JsonItem, ItemName } from '../types';

const items: JsonItem = jsonItems as JsonItem;

/*
const getKeyByValue = (obj: object, value: unknown): unknown => {
  return Object.keys(obj).find(key => obj[key] === value);
};
*/

/**
 * Lookups the item id of an item by name
 *
 * @param {ItemName} name The item name
 *
 * @returns {number | undefined} The item id or undefined if not found
 */
export const getItemId = (name: ItemName): number | undefined => {
  return items[name.toLowerCase()];
};

/**
 * Converts a string, with assumed numbers, to number by removing
 * spaces and commas.
 *
 * @param {string} number
 *
 * @returns {number}
 */
export const cleanNumber = (number: string): number => {
  return Number(number.replace(/[ ,]+/g, ''));
};
