import React from 'react'
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
        data: ['Result'],
      },
      {
        method: 'command',
        data: ['Command'],
      },
    ] as any[],
    filter: [],
    searchKeywords: '',
  }

  componentDidMount() {
    Hook((iframe.contentWindow as any).console, (log) => {
      const decoded = Decode(log)
      this.setState((state) => update(state, { logs: { $push: [decoded] } }))
    })
  }

  switch = () => {
    const filter = this.state.filter.length === 0 ? ['log'] : []
    this.setState({
      filter,
    })
  }

  handleKeywordsChange = ({ target: { value: searchKeywords } }) => {
    this.setState({ searchKeywords })
  }

  render() {
    return (
      <div style={{ backgroundColor: '#242424' }}>
        <div>
          <button onClick={this.switch.bind(this)}>Show only logs</button>
          <input placeholder="search" onChange={this.handleKeywordsChange} />
        </div>

        <Console
          logs={this.state.logs}
          variant="dark"
          filter={this.state.filter}
          searchKeywords={this.state.searchKeywords}
        />
      </div>
    )
  }
}

render(<App />, document.querySelector('#demo'))
