import itemPageConfig from '../../util/test-util/api-item-page-mock.json';
import { ItemDetails } from '../../types';
import parseItemPage from '../item-page';

describe('parseItemPage', () => {
  it('it returns correct details when given valid page', () => {
    const itemDetails: ItemDetails[] = parseItemPage(itemPageConfig.valid);
    expect(itemDetails).toMatchSnapshot();
  });

  it('it returns empty details array when given an empty page', () => {
    const itemDetails: ItemDetails[] = parseItemPage(itemPageConfig.validEmptyItems);
    expect(itemDetails.length).toBe(0);
  });
});
