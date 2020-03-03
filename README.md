# OSRS Exchange

[![build status][build-badge]][build]
[![code coverage][coverage-badge]][coverage]
[![MIT license][license-badge]][license]
[![npm version][version-badge]][version]
[![semantic-release][release-badge]][release]

A Promise based [Old School RuneScape](https://oldschool.runescape.com) grand exchange API.

**OSRS Exchange** goal is to streamline the process of programmatically
interacting with the Old School RuneScape grand exchange. This is done by having
excellent configuration to support a wide range of use-cases and using [JSON](https://en.wikipedia.org/wiki/JSON) friendly objects as return types.

We provide simple methods for:

- Get item with detailed price by id or name
- Get price history of item by id or name
- Get item pages by alpha and page number

[TypeScript](https://www.typescriptlang.org) is fully supported with definitions and custom types.

## Installation

```
$ npm install osrs-exchange
```

## Usage

### Import

Currently ES6 import is being used by default. This means if you are using CommonJS
you need to import using the following syntax:

```js
const Exchange = require('osrs-exchange').default;
```

### Configuration

We support _optional_ custom configuration for the HTTP requests being performed by the library. Default values will be
used if no config is provided when initializing the `Exchange` object.

```ts
const config = {
  // `userAgent` specifies which user agent to send in the header of the request
  userAgent: 'osrs-exchange',

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request is aborted.
  timeout: 1000, // default is `0` (no timeout)

  // `proxy` defines the hostname and port of the proxy server.
  // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and
  // supplies credentials. This will set an `Proxy-Authorization` header.
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'bobross',
      password: 'happy11accidents',
    },
  },
};
```

### getItemById

Gathers item details from the grand exchange with scraped prices for accuracy.

| Parameter | Required | Note                 |
| --------- | -------- | -------------------- |
| Id        | Yes      | The item id to fetch |

#### Usage

```ts
import Exchange from 'osrs-exchange';

const exchange = new Exchange({ timeout: 1000 }); // optional config

exchange
  .getItemById(4151)
  .then(res => console.info(res))
  .catch(err => console.error(err));
```

#### Response

```js
{
  id: 4151,
  name: 'Abyssal whip',
  description: 'A weapon from the abyss.',
  icon: 'http://services.runescape.com/m=itemdb_oldschool/1582802986184_obj_big.gif?id=4151',
  members: true,
  price: {
    current: 2394089,
    change: { today: 2635, day30: -206892, day90: -276497, day180: -101868 }
  }
}
```

### getItemByName

Gathers item details from the grand exchange with scraped prices for accuracy.

| Parameter | Required | Note                                                       |
| --------- | -------- | ---------------------------------------------------------- |
| Name      | Yes      | A string containing the [ItemName](docs/TYPES.md#ItemName) |

#### Usage

```ts
import Exchange from 'osrs-exchange';

const exchange = new Exchange(); // optional config

exchange
  .getItemByName('abyssal whip')
  .then(res => console.info(res))
  .catch(err => console.error(err));
```

#### Response

Same response as [getItemById](####response).

### getPriceHistoryById

Returns the daily and average price history of an item. The entires are represented by [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) keys with the related price as the value.

Note: This method can not be used from a browser due to `Cross-Origin Resource Sharing` being disabled on the Old School RuneScape exchange API.

| Parameter | Required | Note                 |
| --------- | -------- | -------------------- |
| Id        | Yes      | The item id to fetch |

#### Usage

```ts
import Exchange from 'osrs-exchange';

const exchange = new Exchange(); // optional config

exchange
  .getPriceHistoryById(4151)
  .then(res => console.info(res))
  .catch(err => console.error(err));
```

#### Response

```js
{
  daily: {
    '2020-02-29T00:00:00.000Z': 2391454,
    '2020-03-01T00:00:00.000Z': 2394089,
    ...
  },
  average: {
    '2020-02-29T00:00:00.000Z': 2463351,
    '2020-03-01T00:00:00.000Z': 2455244,
    ...
  }
}
```

### getPriceHistoryByName

Returns the daily and average price history of an item. The entires are represented by [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) keys with the related price as the value.

Note: This method can not be used from a browser due to `Cross-Origin Resource Sharing` being disabled on the Old School RuneScape exchange API.

| Parameter | Required | Note                                                       |
| --------- | -------- | ---------------------------------------------------------- |
| Name      | Yes      | A string containing the [ItemName](docs/TYPES.md#ItemName) |

#### Usage

```ts
import Exchange from 'osrs-exchange';

const exchange = new Exchange(); // optional config

exchange
  .getPriceHistoryByName('abyssal whip')
  .then(res => console.info(res))
  .catch(err => console.error(err));
```

#### Response

Same response as [getPriceHistoryById](####response-1).

### getItemPage

Fetches up to 12 items that start with `alpha` character on the given page.

Note: This method can not be used from a browser due to `Cross-Origin Resource Sharing` being disabled on the Old School RuneScape exchange API.

| Parameter | Required | Note                                              |
| --------- | -------- | ------------------------------------------------- |
| Alpha     | Yes      | A character `a-z` (first letter of the item name) |
| Page      | No       | The page number to get (defaults to `1`)          |

#### Usage

```ts
import Exchange from 'osrs-exchange';

const exchange = new Exchange(); // optional config

exchange
  .getItemPage('a', 5)
  .then(res => console.info(res))
  .catch(err => console.error(err));
```

#### Response

```js
[
  {
    id: 10392,
    name: 'A powdered wig',
    description: 'A big do about nothing.',
    members: true,
    icon: 'http://services.runescape.com/m=itemdb_oldschool/1583157682291_obj_big.gif?id=10392'
  },
  {
    id: 13263,
    name: 'Abyssal bludgeon',
    description: 'Elements of deceased Abyssal Sires have been fused together.',
    members: true,
    icon: 'http://services.runescape.com/m=itemdb_oldschool/1583157682291_obj_big.gif?id=13263'
  },
  ...
]
```

## Types

See the [TYPES](docs/TYPES.md) file for details.

## Contributing

See the [CONTRIBUTING](CONTRIBUTING.md) file for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<!-- badges -->

[build-badge]: https://img.shields.io/github/workflow/status/osrslogs/osrs-exchange/CI/master
[build]: https://github.com/osrslogs/osrs-exchange/actions?query=branch%3Amaster
[coverage-badge]: https://img.shields.io/codecov/c/github/osrslogs/osrs-exchange/master
[coverage]: https://codecov.io/github/osrslogs/osrs-exchange/branch/master
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: LICENSE
[version-badge]: https://img.shields.io/npm/v/osrs-exchange
[version]: https://www.npmjs.com/package/osrs-exchange
[release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[release]: https://github.com/semantic-release/semantic-release
