import React, { Component } from 'react'
import { Subscription } from 'react-apollo'
import gql from 'graphql-tag'
import IconButton from './components/IconButton'

const MESSAGE_SUBSCRIPTION = gql`
  subscription {
    messageCreated {
      id
      text
    }
  }
`

export default class Home extends Component {
  state = {
    yourChoice: '',
    rivalChoice: '',
    isDisconnected: false
  }

  handleIsDisconnectedChange = isDisconnected => {
    this.setState({ isDisconnected })
  }

  handleYourChoiceChange = yourChoice => {
    this.setState({ yourChoice })
  }

  handleRockPapperSissorsGame = (yourChoice, rivalChoice) => {
    let result = 'you lose'

    if (yourChoice === rivalChoice) {
      result = 'draw'
    }

    if (yourChoice === 'Scissors' && rivalChoice === 'Paper') {
      result = 'you win'
    }

    if (yourChoice === 'Paper' && rivalChoice === 'Rock') {
      result = 'you win'
    }

    if (yourChoice === 'Rock' && rivalChoice === 'Scissors') {
      result = 'you win'
    }

    return result
  }

  render() {
    const { isDisconnected, yourChoice, rivalChoice } = this.state
    return (
      <React.Fragment>
        <Subscription
          subscription={MESSAGE_SUBSCRIPTION}
          onSubscriptionData={options => {
            const { messageCreated } = options.subscriptionData.data

            // eslint-disable-next-line no-unused-expressions
            messageCreated &&
              messageCreated.id !== window.sessionStorage.token &&
              this.setState({ rivalChoice: messageCreated.text })
          }}
        />
        {isDisconnected && <p>disconnected</p>}
        <p>your choice: {yourChoice}</p>
        <p>rival choice: {rivalChoice}</p>

        {yourChoice && rivalChoice && (
          <p>{this.handleRockPapperSissorsGame(yourChoice, rivalChoice)}</p>
        )}

        <IconButton
          text="Rock"
          handleYourChoiceChange={this.handleYourChoiceChange}
          handleIsDisconnectedChange={this.handleIsDisconnectedChange}
        />
        <IconButton
          text="Paper"
          handleYourChoiceChange={this.handleYourChoiceChange}
          handleIsDisconnectedChange={this.handleIsDisconnectedChange}
        />
        <IconButton
          text="Scissors"
          handleYourChoiceChange={this.handleYourChoiceChange}
          handleIsDisconnectedChange={this.handleIsDisconnectedChange}
        />
      </React.Fragment>
    )
  }
}
