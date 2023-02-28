const _ = require('lodash')

class SearchIndex {
  constructor(items = [], options = {}) {
    this.searchableAttributes = options.searchable
    this.items = items.map(data => prepareData(data, options.searchable))
  }

  search(query) {
    let filters = parseQuery(query)

    let hits = this.items.filter(item => {
      let results = []
      for (let f of filters) {
        if (!f.value) return false

        if (f.value.startsWith('<')) {
          let isLess = item._searchable[f.field] < parseFloat(f.value.replace('<', ''))
          results.push(isLess)
        } else if (f.value.startsWith('>')) {
          let isMore = item._searchable[f.field] > parseFloat(f.value.replace('>', ''))
          results.push(isMore)
        } else {
          const regex = new RegExp(f.value.replace(/,/g, '|'), 'i')
          const result = regex.test(item._searchable[f.field])
          results.push(result)
        }
      }

      return results.every(Boolean)
    })

    return hits.map(h => h._raw)
  }
}

function prepareData(rawData, searchableAttributes = []) {
  const data = {}
  data._raw = rawData
  data._searchable = {}
  data._searchable._ = generateKey(rawData, searchableAttributes)

  for (let key in rawData) {
    let value = rawData[key]
    if (searchableAttributes.length && !searchableAttributes.includes(key)) continue
    if (value === undefined || value === null) {
      data._searchable[key] = ''
    } else if (Array.isArray(value)) {
      data._searchable[key] = value.map(el => el.toString().toLowerCase()).join(',')
    } else if (_.isNumber(value)) {
      data._searchable[key] = value
    } else {
      data._searchable[key] = value.toString().toLowerCase()
    }
  }

  return data
}

function generateKey(data, searchableAttributes = []) {
  const searchableData = searchableAttributes.length ? _.pick(data, searchableAttributes) : data
  const values = Object.values(searchableData)

  return (
    '|' +
    values
      .map(v => v || '')
      .filter(v => v)
      .join('|')
      .toLowerCase() +
    '|'
  )
}

function parseQuery(query) {
  if (!query) return []

  const parts = query.match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g) || []
  const filters = []
  for (let value of parts) {
    let field = '_'
    if (value.includes(':')) {
      let parts = value.split(':')
      field = parts[0]
      value = parts[1]
    }
    value = value.replace(/"/g, '').toLowerCase()

    if (field && value) {
      filters.push({ field, value })
    }
  }

  return filters
}

function createIndex(items, options) {
  return new SearchIndex(items, options)
}

module.exports = {
  createIndex
}
