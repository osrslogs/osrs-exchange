import parseItemHtml from '../item-html';
import htmlConfig from '../../util/test-util/html-mock.json';
import { InvalidHtmlError } from '../../util/error';
import { Item } from '../../types';

describe('parseItemHtml', () => {
  it('throws error on invalid page', () => {
    expect(() => parseItemHtml(htmlConfig.invalidPage)).toThrow(InvalidHtmlError);
  });

  it('it returns Item when given a valid page', () => {
    const item: Item = parseItemHtml(htmlConfig.validPage);
    expect(item).toMatchSnapshot();
  });
});
