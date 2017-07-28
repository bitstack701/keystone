import React from 'react'
import {compose, setDisplayName} from 'recompose'

import {withToggle} from '../hoc/withToggle'
import Button, {buttonStyle} from './ButtonNoHover'


const toggleStyle = {
  base: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderStyle: 'none',
  },

  toggledOn: {
    backgroundColor: buttonStyle.base.color,
    color: '#c1c1c1',
  }
}

const enhance = compose(
  setDisplayName('ToggleButton'),
  withToggle,
)

const ToggleButton = enhance(({style, size, toggledOn, toggle, children}) => {
  const styles = [toggleStyle.base]
  toggledOn && styles.push(toggleStyle.toggledOn)
  styles.push(style)
  return <Button style={styles} size={size} onClick={toggle}>{children}</Button>
})

export default ToggleButton