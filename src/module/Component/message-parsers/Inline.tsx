import * as React from 'react'
import { Message } from '../../definitions/Component'
import ErrorPanel from './Error'

interface Props {
  log: Message
}

class InlineMessage extends React.PureComponent<Props, any> {
  render() {
    const { log } = this.props

    // Error expansion panel
    if (log.method === 'error') {
      return <ErrorPanel {...this.props} />
    }

    // Don't show quotes
    return <span data-type="inline">{log.data.join(' ')}</span>
  }
}

export default InlineMessage
