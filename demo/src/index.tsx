import * as React from 'react'
import { render } from 'react-dom'
import update from 'immutability-helper'
import { Hook, Console, Decode } from '../../src'

const iframe = document.createElement('iframe')
iframe.src = './iframe.html'
document.body.appendChild(iframe)

class App extends React.Component {
  state = {
    logs: [
      {
        method: 'result',
        data: ['Result']
      },
      {
        method: 'command',
        data: ['Command']
      }
    ] as any[],
    filter: []
  }

  componentDidMount() {
    Hook(iframe.contentWindow.console, (log) => {
      const decoded = Decode(log)
      this.setState((state) => update(state, { logs: { $push: [decoded] } }))
    })
  }

  switch = () => {
    const filter = this.state.filter.length === 0 ? ['log'] : []
    this.setState({
      filter
    })
  }

  render() {
    return (
      <div style={{ backgroundColor: '#242424' }}>
        <button onClick={this.switch.bind(this)}>Show only logs</button>
        <Console
          logs={this.state.logs}
          variant="dark"
          filter={this.state.filter}
        />
      </div>
    )
  }
}

render(<App />, document.querySelector('#demo'))
