import React from 'react'
import {ApolloProvider} from 'react-apollo'
import {ThemeProvider} from 'styled-components'
import {createClient} from './client'
import {GlobalStyle} from './styles/reset.css'
import theme from './styles/theme'


export default function App(){
  return (
    <ApolloProvider client={createClient()}>
      <ThemeProvider theme={theme}>
      <React.Fragment>
      
        <GlobalStyle>
          
        </GlobalStyle>
       
            hey
       

      </React.Fragment>
      </ThemeProvider>
    </ApolloProvider>
  )
}