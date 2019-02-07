import React from 'react'
import isEqual from 'react-fast-compare'

import { useAsyncCallback } from './AsyncButton'

export function useTempValue(initialValue, { onSubmit, onReset } = {}) {
  const [value, setState] = React.useState(initialValue)
  const [baseValue, setBaseValue] = React.useState(initialValue)

  const hasChanged = !React.useMemo(() => isEqual(baseValue, value), [baseValue, value])

  const onInputChange = React.useCallback(e => setState(e.target.value), [setState])

  const [handleSubmit, { data, loading, error }] = useAsyncCallback(async () => {
    if (onSubmit) {
      await onSubmit(value)
    }
    setBaseValue(value)
  })

  function handleReset() {
    if (onReset) {
      onReset(value)
    }
    setState(baseValue)
  }

  return {
    value,
    hasChanged,
    data,
    loading,
    error,
    onChange: setState,
    onInputChange,
    reset: handleReset,
    submit: handleSubmit
  }
}

export const TempValue = React.memo(function TempValue(props) {
  const all = useTempValue(props.initialValue, props)

  return props.children(all)
})

function noop() {}
TempValue.defaultProps = {
  onReset: noop,
  onSubmit: noop
}
