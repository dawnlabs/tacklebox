import React from 'react'

export function useAsyncCallback(cb) {
  const [loading, setLoading] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [data, setData] = React.useState(null)

  const passedCallback = React.useCallback(
    async function(...props) {
      setLoading(true)
      setError(null)
      try {
        const response = await cb(...props)
        setData(response)
        return response
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [cb]
  )

  return [
    passedCallback,
    {
      data,
      loading,
      error
    }
  ]
}

export const AsyncButton = React.memo(function AsyncButton(props) {
  const [onClick, { data, loading, error }] = useAsyncCallback(props.onClick)
  return props.children({
    data,
    loading,
    error,
    onClick
  })
})

AsyncButton.displayName = 'AsyncButton'
