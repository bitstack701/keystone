import React from 'react'
import { compose, setDisplayName } from 'recompose'
import Radium from 'radium'

import { addStyle } from '../hoc/addStyle'

const flexStyle = {
  base: {
    flex: 1
  }
}

const enhance = compose(
  addStyle(flexStyle.base),
  setDisplayName('FlexItem'),
  Radium,
)

export default enhance(({style, column, children}) =>
  <div style={[style]}>
    {children}
  </div>
)