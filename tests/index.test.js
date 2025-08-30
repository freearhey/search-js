const sj = require('../src/index.js')

let data = [
  { firstName: 'Nikhitha', lastName: 'Baneree', age: 24, passphrase: 'car plane' },
  { firstName: 'Jeremy', lastName: 'Taylor', age: 13, passphrase: 'road main', url: '' },
  {
    firstName: 'Jerry',
    lastName: 'Onkovich',
    age: 18,
    passphrase: 'carpool fan+',
    url: 'http://google.com'
  },
  {
    firstName: 'Gwendolyn',
    lastName: 'Kennedy',
    age: 43,
    passphrase: 'audio tank',
    url: 'http://test.com?hash=abc'
  }
]

it('can find items', () => {
  let index = sj.createIndex(data)

  expect(index.search('jer')).toMatchObject([data[1], data[2]])
  expect(index.search('+')).toMatchObject([data[2]])
  expect(index.search('firstName:ni')).toMatchObject([data[0]])
  expect(index.search('firstName:/^j/ age:>13')).toMatchObject([data[2]])
  expect(index.search('age:>18')).toMatchObject([data[0], data[3]])
  expect(index.search('age:>13 age:<20')).toMatchObject([data[2]])
  expect(index.search('13')).toMatchObject([data[1]])
  expect(index.search('lastName:/^(k|b)/')).toMatchObject([data[0], data[3]])
  expect(index.search('w y')).toMatchObject([data[3]])
  expect(index.search('ch,kh')).toMatchObject([data[0], data[2]])
  expect(index.search('car p')).toMatchObject([data[0], data[2]])
  expect(index.search('"car p"')).toMatchObject([data[0]])
  expect(index.search('http://test.com?hash=abc')).toMatchObject([data[3]])
  expect(index.search('url:http://test.com?hash=abc')).toMatchObject([data[3]])
  expect(index.search('firstName:/^n/')).toMatchObject([data[0]])
  expect(index.search('url:/^$/')).toMatchObject([data[1]])
  expect(index.search('url:/./')).toMatchObject([data[2], data[3]])
})

it('can find items when options.searchable is specified', () => {
  let index = sj.createIndex(data, { searchable: ['firstName'] })

  expect(index.search('re')).toMatchObject([data[1]])
  expect(index.search('firstName:ly')).toMatchObject([data[3]])
  expect(index.search('lastName:on')).toMatchObject([])
})
