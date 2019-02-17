import { createGlobalStyle } from 'styled-components'

// eslint-disable-next-line import/prefer-default-export
export const GlobalStyle = createGlobalStyle`
    html, body, #root, #root>div {
    height: 100%
    }
    html, body {
        margin: 0;
        padding: 0;
        overflow: hidden;
    }  
    body {
        font-family: 'Nueu', sans-serif;
        background-color: white;
        font-size: 12px;
        -webkit-font-smoothing: antialiased;  
    }
    *, ::after, ::before {
        box-sizing: border-box;
    }
    p {
        margin-top: 0;
    }
    a {
        text-decoration: none;
    }
`
