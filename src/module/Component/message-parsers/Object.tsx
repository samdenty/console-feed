import * as React from 'react'
import { Message } from '../../definitions/Component'
import Inspector from '../react-inspector'

interface Props {
  log: Message
  quoted: boolean
}

class ObjectTree extends React.PureComponent<Props, any> {
  render() {
    const { quoted, log } = this.props

    return log.data.map((message: any, i: number) => {
      if (!quoted && typeof message === 'string' && message.length) {
        return (
          <span data-type="string">
            {`${message} `}
          </span>
        )
      }

      return <Inspector data={message} key={i} method={log.method} />
    })
  }
}

export default ObjectTree
