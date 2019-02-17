import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Button } from '../../style'

const MESSAGE_MUTATION = gql`
  mutation createMessageMutation($input: createMessageInput!) {
    createMessage(input: $input) {
      text
    }
  }
`

export default function IconButton({
  text,
  handleIsDisconnectedChange,
  handleYourChoiceChange
}) {
  return (
    <Mutation
      mutation={MESSAGE_MUTATION}
      onCompleted={() => {
        // eslint-disable-next-line no-unused-expressions
        text && handleYourChoiceChange(text)
        // eslint-disable-next-line no-unused-expressions
        !window.sessionStorage.token && handleIsDisconnectedChange(true)
      }}
      onError={() => {
        // eslint-disable-next-line no-unused-expressions
        !window.sessionStorage.token && handleIsDisconnectedChange(true)
      }}
    >
      {(createMessage, { loading }) => (
        <Button
          type="button"
          disabled={!text}
          onClick={() => {
            if (!text) {
              // eslint-disable-next-line no-useless-return
              return
            }
            createMessage({
              variables: {
                input: {
                  id: window.sessionStorage.token,
                  text
                }
              }
            })
          }}
        >
          {loading ? 'Loading...' : text}
        </Button>
      )}
    </Mutation>
  )
}
