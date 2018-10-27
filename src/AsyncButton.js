import { memo, useState } from 'react'

export const useAsyncCallback = function(cb, initiallyLoading = false) {
  const [loading, setLoading] = useState(initiallyLoading)
  const [error, setError] = useState(null)

  return {
    loading,
    error,
    onAction: async function(...props) {
      setLoading(true)
      setError(null)
      try {
        return await cb(...props)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }
  }
}

export const AsyncButton = memo(function AsyncButton(props) {
  const { loading, error, onAction } = useAsyncCallback(props.onClick, props.initiallyLoading)
  return props.children({
    loading,
    error,
    onClick: onAction
  })
})
