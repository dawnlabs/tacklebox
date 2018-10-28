import { memo, useState } from 'react'

export function useAsyncCallback(cb) {
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  return [
    async function(...props) {
      setLoading(true)
      setError(null)
      try {
        return await cb(...props)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    {
      loading,
      error
    }
  ]
}

export const AsyncButton = memo(function AsyncButton(props) {
  const [onClick, { loading, error }] = useAsyncCallback(props.onClick)
  return props.children({
    loading,
    error,
    onClick
  })
})
