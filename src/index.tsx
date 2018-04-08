import * as React from 'react'
import { render } from 'react-dom'
import { Hook, Console } from './module'

const iframe = document.getElementsByTagName('iframe')[0].contentWindow

class App extends React.Component {
  state = {
    logs: []
  }

  componentDidMount() {
    setTimeout(() => {
      Hook(iframe.console, (log) => {
        console.log('proxy =>', log)
        this.setState({
          logs: [...this.state.logs, log]
        })
      })
    }, 500)
  }

  render() {
    return (
      <div style={{ backgroundColor: '#242424' }}>
        <Console logs={this.state.logs} variant="dark" />
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
