import { getItemId } from '../utils';

describe('getItemIdByName', () => {
  it('returns correct id if name is valid', () => {
    const id = getItemId('abyssal whip');
    const expected = 4151;
    expect(id).toBe(expected);
  });
});
