import React, { useState } from 'react'
import gql from 'graphql-tag'
import queryString from 'query-string'
import { Mutation } from 'react-apollo'

import {
  Wrapper,
  Form,
  ButtonWrapper,
  Button,
  InputWrapper,
  Input,
  Title
} from '../styles'

const LOGIN_USER_MUTATION = gql`
  mutation loginUserMutation($input: LoginUserInput!) {
    loginUser(input: $input) {
      token
    }
  }
`

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

export default function LoginForm({ history, location }) {
  const username = userFormInput('')
  const password = userFormInput('')
  return (
    <Wrapper>
      <Mutation mutation={LOGIN_USER_MUTATION}>
        {(loginUser, { loading }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault()
              try {
                if (!username.value || !password.value) {
                  return
                }

                const response = await loginUser({
                  variables: {
                    input: {
                      username: username.value,
                      password: password.value
                    }
                  }
                })

                if (response) {
                  const { token } = response.data.loginUser
                  window.sessionStorage.setItem('token', token)

                  const { r } = queryString.parse(location.search)

                  if (r && typeof r === 'string') {
                    history.replace(r)
                  } else {
                    history.replace('/')
                  }
                }
              } catch (error) {
                // eslint-disable-next-line no-console
                console.log('something is wrong', error)
              }
            }}
          >
            <InputWrapper>
              <Title>USER: </Title>
              <br />
              <Input {...username} />
            </InputWrapper>
            <InputWrapper>
              <Title>PASSWORD: </Title>
              <br />
              <Input type="password" {...password} />
            </InputWrapper>

            <ButtonWrapper>
              <Button
                type="submit"
                disabled={!username.value || !password.value}
              >
                {loading ? 'Loading...' : 'Login'}
              </Button>
            </ButtonWrapper>
          </Form>
        )}
      </Mutation>
    </Wrapper>
  )
}
