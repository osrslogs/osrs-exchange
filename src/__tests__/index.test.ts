import Exchange from '..';

describe('Module entrypoint', () => {
  it('Imports the Exchange class', () => {
    const exchange = new Exchange();
    expect(exchange).toBeTruthy();
  });
});
