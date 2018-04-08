import * as React from 'react'
import { NodeProps } from '../../definitions/Component'
import Inspector from './react-inspector'

import formatMessage from './devtools-parser'
import { Resolve } from './Resolve'

import * as classNames from 'classnames'
// @ts-ignore
import withStyles from 'react-jss'
import { Styles } from 'jss'

const styles = {
  row: {
    position: 'relative',
    display: 'flex',
    color: '#fff',
    borderTop: '1px solid rgba(255, 255, 255, 0.07)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
    marginTop: -1,
    paddingLeft: 10,
    boxSizing: 'border-box',
    '& *': {
      boxSizing: 'border-box',
      fontFamily: 'Consolas, Lucida Console, Courier New, monospace',
      fontSize: '12px'
    }
  },
  warn: {
    backgroundColor: '#332b00',
    color: '#ffdc9e',
    borderColor: '#650',
    marginTop: -1
  },
  error: {
    backgroundColor: '#290000',
    borderColor: '#5b0000'
  },

  // Icons
  icon: {
    width: 10,
    height: 18,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 50%'
  },
  warnIcon: {
    backgroundImage: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACkSURBVChTbY7BCoJQFERn0Q/3BX1JuxQjsSCXiV8gtCgxhCIrKIRIqKDVzXl5w5cNHBjm6eGinXiAXu5inY2xYm/mbpIh+vcFhLA3sx0athNUhymEsP+10lAEEA17x8o/9wFuNGnYuVlWve0SQl7P0sBu3aq2R1Q/1JzSkYGd29eqNv2wjdnUuvNRciC/N+qe+7gidbA8zyHkOINsvA/sumcOkjcabcBmw2+mMgAAAABJRU5ErkJggg==')`
  },
  infoIcon: {
    backgroundImage: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADISURBVChTY4ABp/AztmZBZ07qe538rO114rOa8+GTskYHbKHSEOARd6nLIOTsf61gIA46U6kVePYQiK3uc/K/hPG+LrCi8IyrtkZh5yCKgk/80w46ba0RdGYGhH/2v6rXyf88qtttGVwSLp2ECQLxeiAu1wo6uwpJ7L+o2f6TDA6xZz8jCyqFnuHXCj4djywmZXHoM/EK0azGqhBsNYpngL6VCTnGqRF4xgKo+D5IDO4ZEEAKnjcQBafvqwWf/YoSPDCAP8AZGAC7mLM81zgOTQAAAABJRU5ErkJggg==')`
  },
  errorIcon: {
    backgroundImage: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADESURBVChTY4CB7ZI8tmfU5E6e01b+DMIgNkgMKg0BR9Vkux6YWPx/bemIgkFiIDmwogOaqrYPzazAEm8DwuGKYGyQHEgNw0VT05Mwib9v3v7/kJEHxiA2TDFIDcNNU4vPMFPACj58/P/v40cwGyYOUsNwy8IZRSFIEUgxskKQGoZrzp4ErQapYbgYHG371M4dLACTQGaD5EBqwD6/FpzQ9dTBE64IhkFiIDmwIhi4mlJqey8o4eR9r8jPIAxig8QgsgwMAFZz1YtGPXgjAAAAAElFTkSuQmCC')`
  },

  // Message
  message: {
    clear: 'right',
    position: 'relative',
    padding: '3px 22px 2px 0',
    marginLeft: 15,
    minHeight: 18,
    flex: 'auto',
    display: 'flex',
    width: 'calc(100% - 15px)'
  }
} as Styles

class Node extends React.PureComponent<NodeProps, any> {
  render() {
    const { log, classes } = this.props
    return (
      <div
        className={classNames({
          [classes.row]: true,
          [classes[log.method]]: true,
          [log.method]: true
        })}>
        <div
          className={classNames({
            [classes.icon]: true,
            [classes[`${log.method}Icon`]]: true,
            icon: true
          })}
        />
        <div
          className={classNames({
            [classes.message]: true,
            message: true
          })}>
          {this.getNode()}
        </div>
      </div>
    )
  }

  getNode() {
    let { log } = this.props

    // Resolve descended types etc.
    if (!log.resolved) {
      log = Resolve(log)
    }

    if (
      log.data.length > 0 &&
      typeof log.data[0] === 'string' &&
      log.data[0].indexOf('%') > -1
    ) {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: formatMessage(log.data || [])
          }}
        />
      )
    }

    return log.data.map((message: any, i: number) => (
      <Inspector data={message} key={i} />
    ))
  }
}

export default withStyles(styles)(Node)
