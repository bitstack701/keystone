import {compose, withState, withHandlers} from 'recompose'

export const withToggle = compose(
  withState('toggledOn', 'toggle', (props) => props.toggledOn),
  withHandlers({
    show: ({ toggle }) => (e) => toggle(true),
    hide: ({ toggle }) => (e) => toggle(false),
    toggle: ({ toggle, onValueChanged, value, data }) => (e) => {
      toggle((current) => {
        onValueChanged && onValueChanged({data, toggledOn: !current})
        return !current
      })
    }
  })
)
