import '@emotion/react'
import styled, { CreateStyled } from '@emotion/styled'
import { Context } from '../../definitions/Component'
declare module '@emotion/react' {
  export interface Theme extends Context {}
}

export default styled as CreateStyled
