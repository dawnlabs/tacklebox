import { memo, useState, useMemo } from 'react'

const isEqual = (source, target) => {
  if (source === target) {
    return true
  }

  if (typeof source === 'object' && typeof target === 'object') {
    if (Array.isArray(source)) {
      return source.every((value, i) => isEqual(value, target[i]))
    }

    return Object.keys(source).every(key => isEqual(source[key], target[key]))
  }

  return false
}

export function useTempValue(props) {
  const [value, setState] = useState(props.initialValue)
  const [baseValue, setBaseValue] = useState(props.initialValue)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const hasChanged = !useMemo(() => isEqual(baseValue, value), [value])

  async function handleSubmit() {
    setLoading(true)
    setError(null)
    try {
      if (props.onSubmit) {
        await props.onSubmit(value)
      }
      setBaseValue(value)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  function handleCancel() {
    setState(baseValue)
    props.onCancel && props.onCancel()
  }

  return {
    hasChanged,
    value,
    loading,
    error,
    onChange: setState,
    onInputChange: e => setState(e.target.value),
    onCancel: handleCancel,
    onSubmit: handleSubmit
  }
}

function noop() {}
export const TempValue = memo(function TempValue(props) {
  const all = useTempValue(props)

  return props.children(all)
})

TempValue.defaultProps = {
  onCancel: noop,
  onSubmit: noop
}
