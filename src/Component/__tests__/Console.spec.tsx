import * as React from 'react'
import { shallow } from 'enzyme'

import Console from '..'

it('renders', () => {
  const result = shallow(
    <Console
      logs={[
        {
          method: 'log',
          id: 'id',
          data: ['my-log'],
        },
      ]}
    />
  )

  expect(result.html()).toContain('my-log')
})

it('formats messages', () => {
  const result = shallow(
    <Console
      logs={[
        {
          method: 'log',
          id: 'id',
          data: ['%ctest', 'color: red'],
        },
      ]}
    />
  )

  expect(result.html()).toContain('<span style="color: red;">test</span>')
})

it('displays object names', () => {
  const result = shallow(
    <Console
      logs={[
        {
          method: 'log',
          id: 'id',
          data: [new (class MyObject {})()],
        },
      ]}
    />
  )

  expect(result.html()).toContain('MyObject {}')
})

it('linkify object', () => {
  const result = shallow(
    <Console
      logs={[
        {
          method: 'log',
          id: 'id',
          data: ['hello https://example.com'],
        },
      ]}
    />
  )

  expect(result.html()).toContain(
    '<a href="https://example.com" class="linkified" target="_blank">https://example.com</a>'
  )
})

it('linkify object and pass options', () => {
  const result = shallow(
    <Console
      logs={[
        {
          method: 'log',
          id: 'id',
          data: ['hello https://example.com'],
        },
      ]}
      linkifyOptions={{
        attributes: (href, type) => (type === 'url' ? { rel: 'nofollow' } : {}),
      }}
    />
  )

  expect(result.html()).toContain(
    '<a href="https://example.com" class="linkified" target="_blank" rel="nofollow">https://example.com</a>'
  )
})

it('allows all types methods', () => {
  return (
    <Console
      logs={[
        { method: 'log', id: 'id', data: [] },
        { method: 'debug', id: 'id', data: [] },
        { method: 'info', id: 'id', data: [] },
        { method: 'warn', id: 'id', data: [] },
        { method: 'error', id: 'id', data: [] },
        { method: 'table', id: 'id', data: [] },
        { method: 'clear', id: 'id', data: [] },
        { method: 'time', id: 'id', data: [] },
        { method: 'timeEnd', id: 'id', data: [] },
        { method: 'count', id: 'id', data: [] },
        { method: 'assert', id: 'id', data: [] },
        { method: 'result', id: 'id', data: [] },
        { method: 'command', id: 'id', data: [] },
      ]}
    />
  )
})
