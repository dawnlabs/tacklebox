import React from 'react'
import { render, fireEvent, wait } from 'react-testing-library'

import { useTempValue, TempValue } from '../src'

const updateInput = (input, value) =>
  fireEvent.change(input, {
    target: {
      value
    }
  })

describe('<TempValue />', () => {
  test('useTempValue() hook', () => {
    function MyComponent() {
      const { reset, submit } = useTempValue()

      return (
        <div>
          <button onClick={submit}>Submit</button>
          <button onClick={reset}>Reset</button>
        </div>
      )
    }

    const { getByText } = render(<MyComponent />)

    fireEvent.click(getByText('Submit'))
    fireEvent.click(getByText('Reset'))
  })

  test('should children correctly', async () => {
    const onSubmit = jest.fn(() => Promise.resolve())
    const { getByPlaceholderText, getByText, getAllByText, container } = render(
      <TempValue onSubmit={onSubmit} initialValue="">
        {({ hasChanged, loading, value, submit, reset, onInputChange }) => (
          <form
            onSubmit={e => {
              e.preventDefault()
            }}
          >
            <span>Current Value: {value.toString()}</span>
            <input placeholder="Value" value={value} onChange={onInputChange} />
            <button disabled={!hasChanged || loading} onClick={submit}>
              {loading ? 'Loading' : 'Submit'}
            </button>
            <button disabled={!hasChanged || loading} onClick={reset}>
              {loading ? 'Loading' : 'Reset'}
            </button>
          </form>
        )}
      </TempValue>
    )

    expect(container.firstChild).toMatchSnapshot()

    updateInput(getByPlaceholderText('Value'), 'New Value')

    expect(getByPlaceholderText('Value').value).toBe('New Value')

    fireEvent.click(getByText('Reset'))

    expect(getByPlaceholderText('Value').value).toBe('')

    fireEvent.click(getByText('Submit'))
    // Test that button is disabled
    expect(onSubmit).not.toHaveBeenCalled()

    updateInput(getByPlaceholderText('Value'), 'Final Value')
    expect(getByPlaceholderText('Value').value).toBe('Final Value')

    fireEvent.click(getByText('Submit'))
    getAllByText('Loading')
    await wait()

    expect(onSubmit).toHaveBeenCalledWith('Final Value')
    expect(getByText('Submit').disabled).toBe(true)
  })
})
