import { memo, useState } from 'react'

export function useAsyncCallback(cb) {
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  return [
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
    {
      data,
      loading,
      error
    }
  ]
}

export const AsyncButton = memo(function AsyncButton(props) {
  const [onClick, { data, loading, error }] = useAsyncCallback(props.onClick)
  return props.children({
    data,
    loading,
    error,
    onClick
  })
})
