import * as React from 'react'
import { NodeProps, Theme } from '../definitions/Component'
import Inspector from './react-inspector'

import formatMessage from './devtools-parser'

import * as classNames from 'classnames'
// @ts-ignore
import withStyles from 'react-jss'
import { Styles } from 'jss'

const styles = (theme: Theme) =>
  ({
    row: {
      position: 'relative',
      display: 'flex',
      color: theme.styles.LOG_COLOR || 'rgba(255,255,255,0.9)',
      backgroundColor: theme.styles.LOG_BACKGROUND || 'transparent',
      borderTop: `1px solid ${theme.styles.LOG_BORDER ||
        'rgba(255, 255, 255, 0.07)'}`,
      borderBottom: `1px solid ${theme.styles.LOG_BORDER ||
        'rgba(255, 255, 255, 0.07)'}`,
      marginTop: -1,
      paddingLeft: 10,
      boxSizing: 'border-box',
      '& *': {
        boxSizing: 'border-box',
        fontFamily:
          theme.styles.BASE_FONT_FAMILY ||
          'Consolas, Lucida Console, Courier New, monospace',
        fontSize: theme.styles.BASE_FONT_SIZE || '12px'
      }
    },
    warn: {
      backgroundColor: theme.styles.LOG_WARN_BACKGROUND || '#332b00',
      color: theme.styles.LOG_WARN_COLOR || '#ffdc9e',
      borderColor: theme.styles.LOG_WARN_BORDER || '#650'
    },
    error: {
      backgroundColor: theme.styles.LOG_ERROR_BACKGROUND || '#290000',
      borderColor: theme.styles.LOG_ERROR_BORDER || '#5b0000',
      color: theme.styles.LOG_ERROR_COLOR || '#ff8080'
    },

    // Icons
    icon: {
      width: theme.styles.LOG_ICON_WIDTH || 10,
      height: theme.styles.LOG_ICON_HEIGHT || 18,
      backgroundImage:
        theme.styles.LOG_ICON ||
        `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABaSURBVChTY6AtmDx5cvnUqVP1oFzsoL+/XwCo8DEQv584caIVVBg7mDBhghxQ4Y2+vr6vU6ZM8YAKYwdA00SB+CxQ8S+g4jCoMCYgSiFRVpPkGaAiHMHDwAAA5Ko+F4/l6+MAAAAASUVORK5CYII=')`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 50%'
    },
    warnIcon: {
      backgroundImage:
        theme.styles.LOG_WARN_ICON ||
        `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACkSURBVChTbY7BCoJQFERn0Q/3BX1JuxQjsSCXiV8gtCgxhCIrKIRIqKDVzXl5w5cNHBjm6eGinXiAXu5inY2xYm/mbpIh+vcFhLA3sx0athNUhymEsP+10lAEEA17x8o/9wFuNGnYuVlWve0SQl7P0sBu3aq2R1Q/1JzSkYGd29eqNv2wjdnUuvNRciC/N+qe+7gidbA8zyHkOINsvA/sumcOkjcabcBmw2+mMgAAAABJRU5ErkJggg==')`
    },
    infoIcon: {
      backgroundImage:
        theme.styles.LOG_INFO_ICON ||
        `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADISURBVChTY4ABp/AztmZBZ07qe538rO114rOa8+GTskYHbKHSEOARd6nLIOTsf61gIA46U6kVePYQiK3uc/K/hPG+LrCi8IyrtkZh5yCKgk/80w46ba0RdGYGhH/2v6rXyf88qtttGVwSLp2ECQLxeiAu1wo6uwpJ7L+o2f6TDA6xZz8jCyqFnuHXCj4djywmZXHoM/EK0azGqhBsNYpngL6VCTnGqRF4xgKo+D5IDO4ZEEAKnjcQBafvqwWf/YoSPDCAP8AZGAC7mLM81zgOTQAAAABJRU5ErkJggg==')`
    },
    errorIcon: {
      backgroundImage:
        theme.styles.LOG_ERROR_ICON ||
        `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADESURBVChTY4CB7ZI8tmfU5E6e01b+DMIgNkgMKg0BR9Vkux6YWPx/bemIgkFiIDmwogOaqrYPzazAEm8DwuGKYGyQHEgNw0VT05Mwib9v3v7/kJEHxiA2TDFIDcNNU4vPMFPACj58/P/v40cwGyYOUsNwy8IZRSFIEUgxskKQGoZrzp4ErQapYbgYHG371M4dLACTQGaD5EBqwD6/FpzQ9dTBE64IhkFiIDmwIhi4mlJqey8o4eR9r8jPIAxig8QgsgwMAFZz1YtGPXgjAAAAAElFTkSuQmCC')`
    },

    // Message
    message: {
      clear: 'right',
      position: 'relative',
      padding: theme.styles.PADDING || '3px 22px 2px 0',
      marginLeft: 15,
      minHeight: 18,
      flex: 'auto',
      display: 'flex',
      width: 'calc(100% - 15px)'
    },
    inlineMessage: {
      whiteSpace: 'pre-wrap',
      paddingRight: 10
    }
  } as Styles)

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
    let { log, classes } = this.props

    // Chrome formatting
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

    // If every message is a string, don't show quotes
    if (log.data.every((message) => typeof message === 'string')) {
      return log.data.map((message: any, i: number) => (
        <span
          key={i}
          className={classNames({
            [classes.inlineMessage]: true,
            'inline-text': true
          })}>
          {message}
        </span>
      ))
    }

    // Normal inspector
    return log.data.map((message: any, i: number) => (
      <Inspector data={message} key={i} method={log.method} />
    ))
  }
}

export default withStyles(styles)(Node)
