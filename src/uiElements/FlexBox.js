import React from 'react'
import { compose, setDisplayName } from 'recompose'
import Radium from 'radium'

import { addStyle } from '../hoc/addStyle'

export const flexStyle = {
  base: {
    display: 'flex'
  },
  flexDirectionColumn: {
    flexDirection: 'column'
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center'
  }
}

const enhance = compose(
  addStyle(flexStyle.base),
  setDisplayName('FlexBox'),
  Radium,
)

export default enhance(({style, column, centered, children}) =>
  <div style={[
    style,
    column && flexStyle.flexDirectionColumn,
    centered && flexStyle.centered
  ]}>
    {children}
  </div>
)