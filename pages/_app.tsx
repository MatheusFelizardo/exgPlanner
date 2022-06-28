import GlobalStyle from '../src/styles/global'
import theme from '../src/styles/theme'
import { ThemeProvider } from 'styled-components'
import {User} from '../src/contexts/User'
import type { AppProps } from 'next/app'
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <User>
        <NextNProgress color="#00BFA6"/>
        <Component {...pageProps} />

        <GlobalStyle />
      </User>
    </ThemeProvider>
  )
}

export default MyApp
