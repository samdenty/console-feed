# console-feed

[![npm version](https://img.shields.io/npm/v/console-feed.svg?style=flat-square)](https://www.npmjs.com/package/console-feed)
[![npm downloads](https://img.shields.io/npm/dm/console-feed.svg?style=flat-square)](https://www.npmjs.com/package/console-feed)

A React component that displays console logs from the current page, an iframe or transported across a server.

![](https://user-images.githubusercontent.com/13242392/38472186-fd099c5a-3b73-11e8-957e-b42d0dbd4d63.png)

## Install

```sh
yarn add console-feed
# or
npm install console-feed
```

## Basic usage

[CodeSandbox](https://codesandbox.io/s/rl7pk9w2ym)

```js
import React from 'react'
import { render } from 'react-dom'
import update from 'immutability-helper'
import { Hook, Console, Decode } from 'console-feed'

class App extends React.Component {
  state = {
    logs: []
  }

  componentDidMount() {
    Hook(window.console, (log) => {
      this.setState((state) =>
        update(state, { logs: { $push: [Decode(log)] } })
      )
    })

    console.log(`Hello world!`)
  }

  render() {
    return (
      <div style={{ backgroundColor: '#242424' }}>
        <Console logs={this.state.logs} variant="dark" />
      </div>
    )
  }
}
```

## Props

### `variant?: 'light' | 'dark'`

Sets the font color for the component. Default - `light`

### `style?: Styles`

Defines the custom styles to use on the component - see [`Styles.d.ts`](https://github.com/samdenty99/console-feed/blob/master/src/module/definitions/Styles.d.ts)

## Stuff to note

When using the `Hook()` API, logs are serialized so that they will safely work with `JSON.stringify`. All the Circular references have already been handled for you.

In order to restore a log back to format compatible with the `<Console>` component, you need to use the `Decode()` method.

### For example:

```js
Hook(window.console, (log) => {
  const parsed = Decode(log)
  const json = JSON.stringify(log)

  const original = Decode(JSON.parse(json))

  // parsed === original
})
```
