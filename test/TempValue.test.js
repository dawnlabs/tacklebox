import React from 'react'
import { render, fireEvent, wait } from 'react-testing-library'

import { TempValue } from '../src'

const updateInput = (input, value) =>
  fireEvent.change(input, {
    target: {
      value
    }
  })

describe('<TempValue />', () => {
  test('should children correctly', async () => {
    const onSubmit = jest.fn(() => Promise.resolve())
    const { getByPlaceholderText, getByText, container } = render(
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
    getByText('Loading')
    await wait()

    expect(onSubmit).toHaveBeenCalledWith('Final Value')
    expect(getByText('Submit').disabled).toBe(true)
  })
})
