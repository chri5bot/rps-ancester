import React, { useState } from 'react'

function userFormInput(initialValue) {
  const [value, setValue] = useState(initialValue)

  function handleChange(e) {
    setValue(e.target.value)
  }
  return {
    value,
    onChange: handleChange
  }
}

export default function LoginForm() {
  const username = userFormInput('')
  const password = userFormInput('')
  return (
    <React.Fragment>
      <form>
        <span>User: </span>
        <input {...username} />
        <br />
        <span>Password: </span>
        <input {...password} />
        <br />
        <button type="submit" disabled={!username || !password}>
          Login
        </button>
      </form>
    </React.Fragment>
  )
}
