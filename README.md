# Action Sack 🎒
> Collection of React user-experience containers for common interactions

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

Button that copies to clipboard and handles interval to display copy text

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

### TempValue
> `hook` 🎣 and `render-prop` container

Stores a temporary value that you can either commit or discard. Useful for forms that with state you might reset.

##### Hook Example
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

##### Container Example
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

### LocalStorage
> `render-prop` container

Container keeps local storage and local state in sync

##### Example
```javascript
import {LocalStorage} from 'actionsack'

<LocalStorage>
  {({ state, setState }) => (
    <button onClick={() => setState(({count}) => ({count: count + 1}))}>
      {state.count}
    </button>
  )}
</LocalStorage>
```
