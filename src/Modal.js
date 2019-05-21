import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import FocusLock from 'react-focus-lock'
import { RemoveScroll } from 'react-remove-scroll'

export const useEventListener = function(eventName, handler) {
  return React.useEffect(() => {
    document.addEventListener(eventName, handler, false)

    return () => document.removeEventListener(eventName, handler, false)
  })
}

export const useKeyboardListener = function(key, handler) {
  const handleKeyDown = React.useCallback(
    function handleKeyDown(event) {
      if (event.key === key) {
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
  useKeyboardListener(ESCAPE_KEY, e => {
    event.stopPropagation()
    props.onClickAway(e)
  })

  let children = props.children

  if (props.removeScroll !== false) {
    children = <RemoveScroll>{children}</RemoveScroll>
  }

  if (props.focusLock !== false) {
    children = <FocusLock>{children}</FocusLock>
  }

  return <ClickAway onClickAway={props.onClickAway}>{props.open ? children : null}</ClickAway>
})

Modal.displayName = 'Modal'
