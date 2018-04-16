import * as React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { Props } from '../definitions/Component'
import Styles from './theme/default'

import { Root } from './elements'
import Message from './Message'

class Console extends React.PureComponent<Props, any> {
  theme = () => ({
    variant: this.props.variant || 'light',
    styles: {
      ...Styles(this.props),
      ...this.props.styles
    }
  })

  render() {
    const filter = this.props.filter || []
    const logs = this.props.logs || []

    return (
      <ThemeProvider theme={this.theme}>
        <Root>
          {logs.map((log, i) => {
            // If the filter is defined and doesn't include the method
            const filtered =
              filter.length !== 0 &&
              log.method &&
              filter.indexOf(log.method) === -1

            return filtered ? null : <Message log={log} key={i} />
          })}
        </Root>
      </ThemeProvider>
    )
  }
}

export default Console
