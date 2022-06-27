import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle<any>`

    :root {
        font-size: 10px;
    }

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
    }

    a {
        text-decoration: none;
    }
    
    p, span, a, li {
        font-size: 1.6rem;
    }
`;
 
export default GlobalStyle;