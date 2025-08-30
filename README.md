# search-js

A tool for searching elements in JavaScript arrays.

## Installation

```bash
npm install @freearhey/search-js
```

## Usage

```js
const sj = require('@freearhey/search-js')

const data = [
  { name: 'Nikita', age: 24 },
  { name: 'Jeremy', age: 13 },
  { name: 'Jerry', age: 18 },
  { name: 'Gwendolyn', age: 43 }
]

const index = sj.createIndex(data)

const results = index.search('Jer')

console.log(results)
```

Output:

```
[
  { name: 'Jeremy', age: 13 },
  { name: 'Jerry', age: 18 },
]
```

**Search syntax:**

| Example             | Description                                                 |
| ------------------- | ----------------------------------------------------------- |
| cat                 | Finds items that have "cat" in their descriptions           |
| cat dog             | Finds items that have "cat" AND "dog" in their descriptions |
| cat,dog             | Finds items that have "cat" OR "dog" in their descriptions  |
| bio:"electric tape" | Finds items that have "electric tape" in the bio            |
| email:/./           | Finds items that have an email                              |
| stars:>4            | Finds items with more than 5 stars                          |
| stars:<2            | Finds items with less than 2 stars                          |

**Options:**

| Name       | Type  | Description                                                                 |
| ---------- | ----- | --------------------------------------------------------------------------- |
| searchable | Array | List of searchable attributes. By default, all attributes will be searched. |

Example:

```js
index.search('t', { searchable: ['lastName'] })
```

## Testing

```bash
npm test
```

## Linting

```bash
npm run lint
```

## Contribution

If you find a bug or want to contribute to the code or documentation, you can help by submitting an [issue](https://github.com/freearhey/search-js/issues) or a [pull request](https://github.com/freearhey/search-js/pulls).

## License

[MIT](LICENSE)
