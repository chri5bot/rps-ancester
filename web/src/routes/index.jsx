import React from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'

import Home from '../views/Home'
import LoginForm from '../views/Login/Form'

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" component={LoginForm} />
      </Switch>
    </Router>
  )
}
