import { memo, useState, useMemo } from 'react'
import isEqual from 'react-fast-compare'

import { useAsyncCallback } from './AsyncButton'

export function useTempValue(initialValue, { onSubmit, onReset } = {}) {
  const [value, setState] = useState(initialValue)
  const [baseValue, setBaseValue] = useState(initialValue)

  const hasChanged = !useMemo(() => isEqual(baseValue, value), [baseValue, value])

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
    onInputChange: e => setState(e.target.value),

    reset: handleReset,
    submit: handleSubmit
  }
}

export const TempValue = memo(function TempValue(props) {
  const all = useTempValue(props.initialValue, props)

  return props.children(all)
})

function noop() {}
TempValue.defaultProps = {
  onReset: noop,
  onSubmit: noop
}
