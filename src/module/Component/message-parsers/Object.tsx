import * as React from 'react'
// @ts-ignore
import * as Linkify from 'linkifyjs/react'
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
      if (typeof message === 'string') {
        const string =
          !quoted && message.length ? (
            `${message} `
          ) : (
            <span>
              <span>"</span>
              <span style={{ color: 'rgb(233, 63, 59)' }}>{message}</span>
              <span>" </span>
            </span>
          )

        return (
          <span data-type="string">
            <Linkify>{string}</Linkify>
          </span>
        )
      }

      return <Inspector data={message} key={i} method={log.method} />
    })
  }
}

export default ObjectTree
