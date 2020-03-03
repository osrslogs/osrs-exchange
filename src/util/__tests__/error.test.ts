import { HttpError, NotFoundError, ServiceUnavailableError } from '../error';

describe('HttpError', () => {
  it('has property status', () => {
    const result = new HttpError('');
    expect(result.status).toBeTruthy();
  });

  it('has property message', () => {
    const result = new HttpError('hello world');
    expect(result.message).toBeTruthy();
  });

  it('has default status 500', () => {
    const result = new HttpError('');
    expect(result.status).toEqual(500);
  });

  it('has custom status when specified', () => {
    const expected = 123;
    const result = new HttpError('', expected);
    expect(result.status).toBe(expected);
  });

  it('has custom message when specified', () => {
    const expected = 'hello world';
    const result = new HttpError(expected);
    expect(result.message).toBe(expected);
  });
});

describe('NotFoundError', () => {
  it('has default status 403', () => {
    const result = new NotFoundError('');
    expect(result.status).toEqual(403);
  });
});

describe('ServiceUnavailableError', () => {
  it('has default status 403', () => {
    const result = new ServiceUnavailableError('');
    expect(result.status).toEqual(503);
  });
});
