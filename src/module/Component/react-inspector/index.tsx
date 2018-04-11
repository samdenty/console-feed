import * as React from 'react'
// @ts-ignore
import withStyles from 'react-jss'
import { Styles } from 'jss'
import {
  ObjectRootLabel,
  ObjectLabel,
  ObjectName,
  Inspector,
  DOMInspector,
  chromeDark,
  chromeLight
  // @ts-ignore
} from 'react-inspector'
// @ts-ignore
import ObjectPreview from 'react-inspector/lib/object-inspector/ObjectPreview'
import { Theme, Variants } from '../../definitions/Component'
import { Methods } from '../../definitions/Methods'
import * as classNames from 'classnames'

interface Props {
  theme: Theme
  data: any
  method: Methods
  classes: any
}

const styles = (theme: Theme) =>
  ({
    root: {
      display: 'inline-block',
      verticalAlign: 'top',
      paddingRight: 10,
      '& li': {
        backgroundColor: 'transparent !important'
      }
    },
    dom: {
      '& div:hover': {
        backgroundColor: 'rgba(255, 220, 158, .05) !important',
        borderRadius: '2px'
      }
    },
    inlineHTML: {
      '& > li': {
        display: 'inline-block'
      }
    },
    proto: {
      '& > span > span:nth-child(1)': {
        opacity: 0.6
      }
    },
    promise: {
      fontStyle: 'italic',
      '& span': {
        opacity: 0.6
      }
    }
  } as Styles)

class CustomInspector extends React.PureComponent<Props, any> {
  state = {
    theme: null
  }

  render() {
    const { classes, data, method } = this.props
    const dom = data instanceof HTMLElement
    const table = method === 'table'

    return (
      <span
        data-type={table ? 'table' : dom ? 'html' : 'object'}
        className={classNames({
          [classes.root]: true,
          [classes.dom]: dom
        })}>
        {table ? (
          <span>
            <Inspector {...this.props} theme={this.state.theme} table />
            <Inspector {...this.props} theme={this.state.theme} />
          </span>
        ) : dom ? (
          <DOMInspector {...this.props} theme={this.state.theme} />
        ) : (
          <Inspector
            {...this.props}
            nodeRenderer={this.nodeRenderer.bind(this)}
            theme={this.state.theme}
          />
        )}
      </span>
    )
  }

  componentWillMount() {
    this.setTheme(this.props.theme)
  }

  setTheme = (theme: Theme) => {
    const styles = theme.variant === 'dark' ? chromeDark : chromeLight
    this.setState({
      theme: { ...styles, ...theme.styles }
    })
  }

  componentWillReceiveProps(nextProps: Props) {
    // Add proper check
    if (nextProps.theme !== this.props.theme) {
      this.setTheme(nextProps.theme)
    }
  }

  nodeRenderer(props: any) {
    const { classes } = this.props
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
      <span className={classNames(classes.inlineHTML, classes.dom)}>
        <ObjectName name={name} />
        <span>: </span>
        <DOMInspector data={data} theme={this.state.theme} />
      </span>
    ) : (
      <span className={proto ? classes.proto : ''}>
        <ObjectLabel
          name={proto ? '<constructor>' : name}
          data={proto ? data.name : data}
          isNonenumerable={isNonenumerable}
        />
      </span>
    )
  }
}

export default withStyles(styles)(CustomInspector)
