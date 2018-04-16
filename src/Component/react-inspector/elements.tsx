import styled from '../theme'
import { Context } from '../../definitions/Component'

/**
 * Return themed log-method style
 * @param style The style
 * @param type The method
 */
const Themed = (style: string, method: string, styles) =>
  styles[`LOG_${method.toUpperCase()}_${style.toUpperCase()}`] ||
  styles[`LOG_${style.toUpperCase()}`]

interface Props {
  theme: Context
}

/**
 * Object root
 */
export const Root = styled('div')({
  display: 'inline-block',
  '&::after': {
    content: `' '`,
    display: 'inline-block'
  },
  // HTML Elements
  '& div:hover': {
    backgroundColor: 'rgba(255, 220, 158, .05) !important',
    borderRadius: '2px'
  },
  '& > li': {
    backgroundColor: 'transparent !important',
    display: 'inline-block'
  },
  '& ol:empty': {
    paddingLeft: '0 !important'
  }
})

/**
 * Table
 */
export const Table = styled('span')({
  '& > li': {
    display: 'inline-block'
  }
})

/**
 * Object constructor
 */
export const Constructor = styled('span')({
  '& > span > span:nth-child(1)': {
    opacity: 0.6
  }
})
