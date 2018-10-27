# Action Sack 🎒
> Collection of React user-experience hooks + containers for common interactions

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

### `useAsyncCallback`
> 🎣 `hook`

Takes any function and gives you a loading and error state. Good for handling
general async interactions. Used by [`AsyncButton`](#asyncbutton).

```js
import {useAsyncCallback} from 'actionsack'

function MyAsyncButton(props) {
  const [onClick, {loading, error}] = useAsyncCallback(props.onClick)

  return (
    <>
      {error && <span>{error}!</span>}
      <button onClick={onClick}>{loading ? 'Saving...' : 'Save'}</button>  
    </>
  )
}
```

### `useKeyboardListener`
> 🎣 `hook`

Pass it a keyboard key and a handler to automatically listen for keyboard clicks. Used by [`Modal`](#modal).


##### Example
```js
import {useKeyboardListener} from 'actionsack'

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
import {Modal} from 'actionsack'

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
import {CopyButton} from 'actionsack'
const interval = 2 * 1000 // 2 seconds

<CopyButton text="https://github.com/dawnlabs/actionsack" interval={interval}>
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
import {AsyncButton} from 'actionsack'
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

Hook that gives you a temporary state value that you can either commit with `onSubmit` or revert with `onCancel`. Used by [`TempValue`](#tempvalue).

##### Example

```javascript
import {useTempValue} from 'actionsack'

function MyForm(props) {
  const initialName = props.name
  const {
    hasChanged,
    value,
    onInputChange,
    onSubmit,
    onCancel
  } = useTempValue(initialName)

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input value={value || ''} onChange={onInputChange} />
      <button disabled={!hasChanged} onClick={onSubmit}>Submit</button>
      <button disabled={!hasChanged} onClick={onCancel}>Cancel</button>
    </form>
  )
}
```

### TempValue
> `render-prop` container

Container that stores a temporary value that you can either commit or discard. Useful for forms that with state you might reset.

##### Example
```javascript
import {TempValue} from 'actionsack'

const someInitialValue = 'Mike' // can be an object too

<TempValue initialValue={someInitialValue}>
  {({ hasChanged, value, loading, error, onInputChange, onSubmit, onCancel }) => (
    <form onSubmit(e => { e.preventDefault(); onSubmit() })>
      {error && <span>{error}</span>}
      <input name="name" value={value} onChange={onInputChange} />
      <button disabled={!hasChanged || loading} type="submit">
        Submit
      </button
      <button disabled={!hasChanged || loading} onClick={onCancel}>
        Cancel
      </button
    </form>
  )}
</TempValue>
```

### License
MIT
