import * as React from 'react'
import { NodeProps, Theme } from '../definitions/Component'

import * as classNames from 'classnames'
// @ts-ignore
import withStyles from 'react-jss'
import { Styles } from 'jss'

import Formatted from './message-parsers/Formatted'
import InlineMessage from './message-parsers/Inline'
import ObjectTree from './message-parsers/Object'

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
        whiteSpace: 'pre-wrap',
        fontSize: theme.styles.BASE_FONT_SIZE || '12px'
      }
    },
    warn: {
      backgroundColor: theme.styles.LOG_WARN_BACKGROUND || '#332b00',
      color: theme.styles.LOG_WARN_COLOR || '#ffdc9e',
      borderColor: theme.styles.LOG_WARN_BORDER || '#650',
      marginBottom: 1
    },
    error: {
      backgroundColor: theme.styles.LOG_ERROR_BACKGROUND || '#290000',
      borderColor: theme.styles.LOG_ERROR_BORDER || '#5b0000',
      color: theme.styles.LOG_ERROR_COLOR || '#ff8080',
      marginBottom: 1
    },
    debug: {
      backgroundColor: theme.styles.LOG_DEBUG_BACKGROUND || '',
      borderColor: theme.styles.LOG_DEBUG_BORDER || '',
      color: theme.styles.LOG_DEBUG_COLOR || '#4D88FF'
    },

    // Icons
    icon: {
      width: theme.styles.LOG_ICON_WIDTH || 10,
      height: theme.styles.LOG_ICON_HEIGHT || 18,
      backgroundImage: theme.styles.LOG_ICON || `none`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 50%'
    },
    commandIcon: {
      backgroundImage:
        theme.styles.LOG_COMMAND_ICON ||
        `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABaSURBVChTY6AtmDx5cvnUqVP1oFzsoL+/XwCo8DEQv584caIVVBg7mDBhghxQ4Y2+vr6vU6ZM8YAKYwdA00SB+CxQ8S+g4jCoMCYgSiFRVpPkGaAiHMHDwAAA5Ko+F4/l6+MAAAAASUVORK5CYII=)`
    },
    resultIcon: {
      backgroundImage:
        theme.styles.LOG_RESULT_ICON ||
        `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABpSURBVChTY6A92LNnj96uXbvKoVzsYMeOHVbbt29/D1T4eP/+/QJQYVSwe/duD6CCr0B8A8iWgwqjAqBk2NatW38B6bPbtm0TBYkBFbsA+c9ANFgRCBCtEASAAoSthgGiPAMD2IOHgQEA521bM7uG52wAAAAASUVORK5CYII=)`
    },
    debugIcon: {
      backgroundImage:
        theme.styles.LOG_DEBUG_ICON ||
        `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 459 459'%3e%3cpath fill='%234D88FF' d='M433.5 127.5h-71.4a177.7 177.7 0 0 0-45.9-51L357 35.7 321.3 0l-56.1 56.1c-10.2-2.6-23-5.1-35.7-5.1s-25.5 2.5-35.7 5.1L137.7 0 102 35.7l40.8 40.8a177.7 177.7 0 0 0-45.9 51H25.5v51H79c-2.5 7.7-2.5 17.9-2.5 25.5v25.5h-51v51h51V306a88 88 0 0 0 2.5 25.5H25.5v51h71.4A152.2 152.2 0 0 0 229.5 459c56.1 0 107.1-30.6 132.6-76.5h71.4v-51H380c2.5-7.7 2.5-17.9 2.5-25.5v-25.5h51v-51h-51V204c0-7.7 0-17.9-2.5-25.5h53.5v-51zm-153 204h-102v-51h102v51zm0-102h-102v-51h102v51z'/%3e%3c/svg%3e")`
    },
    warnIcon: {
      backgroundImage:
        theme.styles.LOG_WARN_ICON ||
        `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACkSURBVChTbY7BCoJQFERn0Q/3BX1JuxQjsSCXiV8gtCgxhCIrKIRIqKDVzXl5w5cNHBjm6eGinXiAXu5inY2xYm/mbpIh+vcFhLA3sx0athNUhymEsP+10lAEEA17x8o/9wFuNGnYuVlWve0SQl7P0sBu3aq2R1Q/1JzSkYGd29eqNv2wjdnUuvNRciC/N+qe+7gidbA8zyHkOINsvA/sumcOkjcabcBmw2+mMgAAAABJRU5ErkJggg==)`
    },
    infoIcon: {
      backgroundImage:
        theme.styles.LOG_INFO_ICON ||
        `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADISURBVChTY4ABp/AztmZBZ07qe538rO114rOa8+GTskYHbKHSEOARd6nLIOTsf61gIA46U6kVePYQiK3uc/K/hPG+LrCi8IyrtkZh5yCKgk/80w46ba0RdGYGhH/2v6rXyf88qtttGVwSLp2ECQLxeiAu1wo6uwpJ7L+o2f6TDA6xZz8jCyqFnuHXCj4djywmZXHoM/EK0azGqhBsNYpngL6VCTnGqRF4xgKo+D5IDO4ZEEAKnjcQBafvqwWf/YoSPDCAP8AZGAC7mLM81zgOTQAAAABJRU5ErkJggg==)`
    },
    errorIcon: {
      backgroundImage:
        theme.styles.LOG_ERROR_ICON ||
        `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADESURBVChTY4CB7ZI8tmfU5E6e01b+DMIgNkgMKg0BR9Vkux6YWPx/bemIgkFiIDmwogOaqrYPzazAEm8DwuGKYGyQHEgNw0VT05Mwib9v3v7/kJEHxiA2TDFIDcNNU4vPMFPACj58/P/v40cwGyYOUsNwy8IZRSFIEUgxskKQGoZrzp4ErQapYbgYHG371M4dLACTQGaD5EBqwD6/FpzQ9dTBE64IhkFiIDmwIhi4mlJqey8o4eR9r8jPIAxig8QgsgwMAFZz1YtGPXgjAAAAAElFTkSuQmCC)`
    },

    // Message
    message: {
      clear: 'right',
      position: 'relative',
      padding: theme.styles.PADDING || '3px 22px 2px 0',
      marginLeft: 15,
      minHeight: 18,
      flex: 'auto',
      width: 'calc(100% - 15px)'
    }
  } as Styles)

class Node extends React.PureComponent<NodeProps, any> {
  render() {
    const { log, classes } = this.props
    return (
      <div
        data-method={log.method}
        className={classNames({
          [classes.row]: true,
          [classes[log.method]]: !!classes[log.method]
        })}>
        <span
          className={classNames({
            [classes.icon]: true,
            [classes[`${log.method}Icon`]]: classes[`${log.method}Icon`]
          })}
        />
        <section className={classes.message}>{this.getNode()}</section>
      </div>
    )
  }

  getNode() {
    let { log, classes } = this.props

    // Error handling
    const error = this.typeCheck(log)
    if (error) return error

    // Chrome formatting
    if (
      log.data.length > 0 &&
      typeof log.data[0] === 'string' &&
      log.data[0].indexOf('%') > -1
    ) {
      return <Formatted data={log.data} />
    }

    // If every message is a string
    if (log.data.every((message) => typeof message === 'string')) {
      return <InlineMessage log={log} />
    }

    // Normal inspector
    return <ObjectTree log={log} />
  }

  typeCheck(log: any) {
    if (!log) {
      return (
        <Formatted
          data={[
            `%c[console-feed] %cFailed to parse message! %clog was typeof ${typeof log}, but it should've been a log object`,
            'color: red',
            'color: orange',
            'color: cyan'
          ]}
        />
      )
    } else if (!(log.data instanceof Array)) {
      return (
        <Formatted
          data={[
            '%c[console-feed] %cFailed to parse message! %clog.data was not an array!',
            'color: red',
            'color: orange',
            'color: cyan'
          ]}
        />
      )
    }
    return false
  }
}

export default withStyles(styles)(Node)
