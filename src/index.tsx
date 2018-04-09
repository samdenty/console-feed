import * as React from 'react'
import { render } from 'react-dom'
import update from 'immutability-helper'
import { Hook, Console, Decode } from './module'

const iframe = document.createElement('iframe')
iframe.src = './iframe.html'
document.body.appendChild(iframe)

class App extends React.Component {
  state = {
    logs: []
  }

  componentDidMount() {
    Hook(iframe.contentWindow.console, (log) => {
      const decoded = Decode(log)
      this.setState((state) =>
        update(state, { logs: { $push: [decoded] } })
      )
    })
  }

  render() {
    return (
      <div style={{ backgroundColor: '#242424' }}>
        <Console
          logs={this.state.logs}
          variant="dark"
        />
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
