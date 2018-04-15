import * as _ from 'lodash'
import Parse from '..'

it('asserts values', () => {
  expect(Parse('assert', [2 > 1], 'assert-true')).toBe(false)
  expect(Parse('assert', [1 > 2], 'assert-false')).toMatchSnapshot(
    'assertion failed'
  )
})

it('counts numbers', () => {
  let final
  _.times(10, () => {
    final = Parse('count', ['count-10'])
  })

  expect(final && final.data[0]).toBe('count-10: 10')
})

it('profiles time', () => {
  Parse('time', ['timer-test'])

  setTimeout(() => {
    const result = Parse('timeEnd', ['timer-test'], 'timer-result')
    expect(result && +result.data[0].replace(/[^0-9]/g, '') > 100).toBeTruthy()
  }, 100)

  const failure = Parse('timeEnd', ['nonExistant'], 'timer-fail')
  expect(failure).toMatchSnapshot('non existant timer')
})

it('records errors', () => {
  const result = Parse('error', [new Error('one')], 'errors')

  expect(result && result.data[0]).toContain('Error: one')
})
