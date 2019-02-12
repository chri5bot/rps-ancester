import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
        overflow: hidden;
    }  
    body {
        font-family: 'Ubuntu', sans-serif;
        font-size: 14px;
        background-color: #f3f3f3;
        -webkit-font-smoothing: antialiased;
    }
    *, ::after, ::before {
        box-sizing: border-box;
    }
    input, textarea, button {
        font-family: 'Ubuntu',sans-serif;
        font-size: 18px;
    }
    p {
        margin-top: 0;
    }
    a {
        text-decoration: none;
    }
`
