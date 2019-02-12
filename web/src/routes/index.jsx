import React from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'

import signedOutFallback from '../helpers/signed-out-fallback'

import Home from '../views/Home'
import LoginForm from '../views/Login/Form'

const LoginFallBack = signedOutFallback(() => <Redirect to="/" />, LoginForm)
const HomeFallBack = signedOutFallback(Home, () => <Redirect to="/login" />)

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomeFallBack} />
        <Route path="/login" exact component={LoginFallBack} />
      </Switch>
    </Router>
  )
}
