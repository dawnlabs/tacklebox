import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'

export const useEventListener = function(eventName, handler) {
  return React.useEffect(() => {
    document.addEventListener(eventName, handler, false)

    return () => document.removeEventListener(eventName, handler, false)
  })
}

export const useKeyboardListener = function(key, handler) {
  const handleKeyDown = React.useCallback(
    function handleKeyDown(event) {
      if (event.key.split('-').pop() === key) {
        if (key.indexOf('⌘') > -1 || key.toLowerCase().indexOf('cmd') > -1) {
          if (!event.metaKey) {
            return
          }
        }
        if (key.indexOf('⌃') > -1 || key.toLowerCase().indexOf('ctrl') > -1) {
          if (!event.ctrlKey) {
            return
          }
        }
        if (key.indexOf('⇧') > -1 || key.toLowerCase().indexOf('shift') > -1) {
          if (!event.shiftKey) {
            return
          }
        }
        if (
          key.indexOf('⌥') > -1 ||
          key.toLowerCase().indexOf('option') > -1 ||
          key.toLowerCase().indexOf('opt') > -1 ||
          key.toLowerCase().indexOf('alt') > -1
        ) {
          if (!event.altKey) {
            return
          }
        }

        return handler(event)
      }
    },
    [key, handler]
  )

  useEventListener('keydown', handleKeyDown)
}

const ESCAPE_KEY = 'Escape'

const ClickAway = enhanceWithClickOutside(
  class WrappedComponent extends React.PureComponent {
    handleClickOutside(e) {
      this.props.onClickAway(e)
    }
    render() {
      return this.props.children
    }
  }
)

export const Modal = React.memo(props => {
  useKeyboardListener(ESCAPE_KEY, props.onClickAway)
  return <ClickAway onClickAway={props.onClickAway}>{props.open ? props.children : null}</ClickAway>
})

Modal.displayName = 'Modal'
