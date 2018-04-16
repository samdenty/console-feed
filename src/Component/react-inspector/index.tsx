import * as React from 'react'
import { withTheme } from 'emotion-theming'
import { Context } from '../../definitions/Component'
import { Root, Table, Constructor, HTML } from './elements'

import {
  ObjectRootLabel,
  ObjectLabel,
  ObjectName,
  Inspector,
  DOMInspector
} from 'react-inspector'
import ObjectPreview from 'react-inspector/lib/object-inspector/ObjectPreview'

interface Props {
  theme?: Context
  data: any
}

class CustomInspector extends React.PureComponent<Props, any> {
  render() {
    const { data, theme } = this.props
    const { styles, method } = theme

    const dom = data instanceof HTMLElement
    const table = method === 'table'

    return (
      <Root data-type={table ? 'table' : dom ? 'html' : 'object'}>
        {table ? (
          <Table>
            <Inspector {...this.props} theme={styles} table />
            <Inspector {...this.props} theme={styles} />
          </Table>
        ) : dom ? (
          <HTML>
            <DOMInspector {...this.props} theme={styles} />
          </HTML>
        ) : (
          <Inspector
            {...this.props}
            theme={styles}
            nodeRenderer={this.nodeRenderer.bind(this)}
          />
        )}
      </Root>
    )
  }

  nodeRenderer(props: any) {
    const { styles } = this.props.theme
    let proto = false
    let { depth, name, data, isNonenumerable } = props

    // Root
    if (depth === 0) {
      const constructor =
        data && data.constructor ? data.constructor.name : null

      return constructor === 'Function' ? (
        <span style={{ fontStyle: 'italic' }}>
          <ObjectPreview data={data} />
          {` {`}
          <span style={{ color: 'rgb(181, 181, 181)' }}>{data.body}</span>
          {`}`}
        </span>
      ) : constructor === 'Promise' ? (
        <span style={{ fontStyle: 'italic' }}>
          Promise {`{`}
          <span style={{ opacity: 0.6 }}>{`<pending>`}</span>
          {`}`}
        </span>
      ) : (
        <ObjectRootLabel name={name} data={data} />
      )
    }

    // Subobject
    if (name === 'constructor') proto = true
    return data instanceof HTMLElement ? (
      <Root>
        <ObjectName name={name} />
        <span>: </span>
        <HTML>
          <DOMInspector data={data} theme={styles} />
        </HTML>
      </Root>
    ) : proto ? (
      <Constructor>
        <ObjectLabel
          name="<constructor>"
          data={data.name}
          isNonenumerable={isNonenumerable}
        />
      </Constructor>
    ) : (
      <ObjectLabel name={name} data={data} isNonenumerable={isNonenumerable} />
    )
  }
}

export default withTheme(CustomInspector)
