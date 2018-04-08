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

![CodeSandbox](https://codesandbox.io/s/rl7pk9w2ym)

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
