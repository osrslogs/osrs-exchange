/* eslint-disable max-classes-per-file */

/**
 * A Error with data details. `data` will containing the data
 * that made the error occur.
 */
class DataError extends Error {
  data: string;

  constructor(msg: string, data: string) {
    super(msg);
    this.data = data;
  }
}

/**
 * Error used when a html page has unexpected structure, e.g: Could not parse element.
 * The raw html can be found in the `data` property.
 */
export class InvalidHtmlError extends DataError {}

/**
 * A generic HTTP error, default status 500.
 * Used to map HTTP status codes to errors.
 */
export class HttpError extends Error {
  status: number;

  constructor(msg: string, status = 500) {
    super(msg);
    this.status = status;
  }
}

export class NotFoundError extends HttpError {
  constructor(msg: string) {
    super(msg, 403);
  }
}

export class ServiceUnavailableError extends HttpError {
  constructor(msg: string) {
    super(msg, 503);
  }
}
