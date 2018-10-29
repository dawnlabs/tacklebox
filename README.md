# Tackle Box 🎣
> Collection of React user-experience hooks + containers for common interactions

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

### `useAsyncCallback`
> 🎣 `hook`

Takes any function and gives you a loading and error state. Good for handling
general asynchronous interactions. Used by [`AsyncButton`](#asyncbutton), [`TempValue`](#tempvalue), and [`CopyButton`](#copybutton).

```js
import {useAsyncCallback} from 'tackle-box'

function MyAsyncButton(props) {
  const [onClick, {loading, error, data}] = useAsyncCallback(props.onClick)

  return (
    <>
      {error && <span>{error}!</span>}
      <button onClick={onClick}>{loading ? 'Saving...' : 'Save'}</button>  
      {data && <span>Success! {data}</span>}
    </>
  )
}
```

### `useKeyboardListener`
> 🎣 `hook`

Pass it a keyboard key and a handler to automatically listen for keyboard clicks. Used by [`Modal`](#modal).


##### Example
```js
import {useKeyboardListener} from 'tackle-box'

function Modal(props) {
  useKeyboardListener('Escape', props.onClose)

  return (
    <div>Hello World</div>
  )
}
```

### Modal
> `wrapper HOC` component

Class controlled Modal component with click-away and ESC-key to close

##### Example
```javascript
import {Modal} from 'tackle-box'

<Modal open={this.state.open} onClickAway={() => this.setState({ open: false})}>
  <form>
    <input placeholder="Enter name here . . ." />
  </form>
</>
```

### CopyButton
> `render-prop` container

Button that copies to clipboard and handles interval to display copy text.
**Note**: you must render a `<button>` in order to copy the text.

##### Example
```javascript
import {CopyButton} from 'tackle-box'
const interval = 2 * 1000 // 2 seconds

<CopyButton text="https://github.com/dawnlabs/tackle-box" interval={interval}>
  {({ copied }) => (
    <button>{copied ? 'COPIED!' : 'Copy URL'}</button>
  )}
</CopyButton>
```

### AsyncButton
> `render-prop` container

Button that automatically sets loading for asynchronous button actions

##### Example
```javascript
import {AsyncButton} from 'tackle-box'
const submit = () => new Promise((resolve) => {
  setTimeout(resolve, 10000, true);
})

<AsyncButton onClick={submit}>
  {({ loading, onClick }) => (
    <button onClick={onClick}>
      {loading ? 'Loading...' : 'Submit'}
    </button>
  )}
</AsyncButton>
```

### `useTempValue`
> `hook` 🎣

Hook that gives you a temporary state value that you can either commit with `submit` or revert with `reset`. Used by [`TempValue`](#tempvalue).

##### Example

```javascript
import {useTempValue} from 'tackle-box'

function MyForm(props) {
  const initialName = props.name
  const {
    hasChanged,
    value,
    onInputChange,
    submit,
    reset
  } = useTempValue(initialName)

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input value={value || ''} onChange={onInputChange} />
      <button disabled={!hasChanged} onClick={submit}>Submit</button>
      <button disabled={!hasChanged} onClick={reset}>Cancel</button>
    </form>
  )
}
```

### TempValue
> `render-prop` container

Container that stores a temporary value that you can either commit or discard. Useful for forms that with state you might reset.

##### Example
```javascript
import {TempValue} from 'tackle-box'

const someInitialValue = 'Mike' // can be an object too

<TempValue initialValue={someInitialValue}>
  {({ hasChanged, value, loading, error, onInputChange, submit, reset }) => (
    <form onSubmit(e => { e.preventDefault(); submit(); })>
      {error && <span>{error}</span>}
      <input name="name" value={value} onChange={onInputChange} />
      <button disabled={!hasChanged || loading} type="submit">
        Submit
      </button
      <button disabled={!hasChanged || loading} onClick={reset}>
        Cancel
      </button
    </form>
  )}
</TempValue>
```

### License
MIT
