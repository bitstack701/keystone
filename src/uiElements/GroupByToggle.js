import React from 'react'
import {compose, setDisplayName, withHandlers, withProps, withState} from 'recompose'

import FlexBox from './FlexBox'
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

const enhanceToggleButton = compose(
  setDisplayName('ToggleButton'),
)

const ToggleButton = enhanceToggleButton(({style, size, toggledOn, data, onValueChanged, children}) => {
  const styles = [toggleStyle.base]
  toggledOn && styles.push(toggleStyle.toggledOn)
  styles.push(style)
  return <Button style={styles} size={size} onClick={() => onValueChanged({data})}>{children}</Button>
})

const enhance = compose(
  setDisplayName("GroupByToggle"),
  withProps(() => ({
    data: [
      {label: 'Hour', value: 'hour'},
      {label: 'Day', value: 'day'},
      {label: 'Month', value: 'month'}
    ]
  })),
  withState("selectedItem", "updateSelectedItem", ({initialValue, data}) => {
    if (initialValue) {
      return data.find(d => d.value === initialValue)
    } else {
      return data[0]
    }
  }),
  withHandlers({
    onValueChanged: ({onValueChanged, updateSelectedItem}) => ({data}) => {
      onValueChanged && onValueChanged({data})
      updateSelectedItem(data)
    }
  })
)

const GroupByToggleStyle = {
  base: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: buttonStyle.base.color,

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginRight: 10,
    overflow: 'hidden'
  },
  noRadius: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  noBorder: {
    borderStyle: 'none',
  },
  firstChild: {
    borderRightStyle: `solid`,
  },
  lastChild: {
    borderLeftStyle: 'solid',
  },
  label: {
    fontSize: 10
  }
}

const GroupByToggle = enhance((props) => {
  const {onValueChanged, data, updateSelectedItem, selectedItem} = props
  console.log(props);


  const items = data.map((d, i) => {
      console.log(selectedItem.value === d.value)
      return (
        <ToggleButton key={`tb-${i}-${d.value}`}
                      noHover
                      style={[
                        i > 0 && GroupByToggleStyle.lastChild,
                        GroupByToggleStyle.noRadius]}
                      onValueChanged={onValueChanged}
                      data={d}
                      value={d.value}
                      toggledOn={selectedItem.value === d.value}
                      size="tiny">
          {d.label}
        </ToggleButton>
      )
    }
  )

  return (
    <FlexBox column>
      <FlexBox style={GroupByToggleStyle.base}>
        {items}
     </FlexBox>
    </FlexBox>
  )
})

export default GroupByToggle