import React from 'react'
import { render } from 'react-dom'
import update from 'immutability-helper'
import { Hook, Console, Decode } from '../../src'

const iframe = document.createElement('iframe')
iframe.src = './iframe.html'
document.body.appendChild(iframe)

class App extends React.Component {
  state = {
    isDarkMode: true,
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
    const { isDarkMode } = this.state
    return (
      <div
        style={{
          margin: '1em 0',
          color: isDarkMode ? '#fff' : '#242424',
          backgroundColor: isDarkMode ? '#242424' : '#fff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
          <button onClick={this.switch.bind(this)}>Show only logs</button>
          <input placeholder="search" onChange={this.handleKeywordsChange} />
          <label>
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={(e) => {
                this.setState({ isDarkMode: e.target.checked })
              }}
            />
            Toggle dark mode
          </label>
        </div>

        <Console
          logs={this.state.logs}
          variant={isDarkMode ? 'dark' : 'light'}
          filter={this.state.filter}
          searchKeywords={this.state.searchKeywords}
        />
      </div>
    )
  }
}

render(<App />, document.querySelector('#demo'))
