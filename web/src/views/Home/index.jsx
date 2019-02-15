import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation, Subscription } from 'react-apollo'

const MESSAGE_MUTATION = gql`
  mutation createMessageMutation($input: createMessageInput!) {
    createMessage(input: $input) {
      text
    }
  }
`

const MESSAGE_SUBSCRIPTION = gql`
  subscription {
    messageCreated {
      text
    }
  }
`

export default class Home extends Component {
  state = {
    text: ''
  }

  componentDidMount() {
    this.subscribe()
  }

  subscribe = () => {
    console.log('hey')
  }

  handleTextChange = e => {
    this.setState({ text: e.target.value })
  }

  render() {
    const { text } = this.state
    return (
      <React.Fragment>
        <Mutation
          mutation={MESSAGE_MUTATION}
          onCompleted={() => {
            console.log('everithing is completed')
          }}
          onError={() => {
            console.log('have an error')
          }}
        >
          {(createMessage, { loading }) => (
            <form>
              <input value={text} onChange={this.handleTextChange} />
              <button
                type="button"
                disabled={!text}
                onClick={() => {
                  if (!text) {
                    // eslint-disable-next-line no-useless-return
                    return
                  }

                  createMessage({
                    variables: {
                      input: { text }
                    }
                  })
                }}
              >
                {loading ? 'Loading...' : 'Create Message'}
              </button>
            </form>
          )}
        </Mutation>
        <Subscription subscription={MESSAGE_SUBSCRIPTION}>
          {({ data, loading }) => (
            <div>
              <p>new message: {!loading && data.messageCreated.text}</p>
            </div>
          )}
        </Subscription>
      </React.Fragment>
    )
  }
}
