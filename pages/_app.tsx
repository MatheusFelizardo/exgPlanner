import GlobalStyle from '../src/styles/global'
import theme from '../src/styles/theme'
import { ThemeProvider } from 'styled-components'
import {User} from '../src/contexts/User'
import type { AppProps } from 'next/app'
import NextNProgress from "nextjs-progressbar";
import { QueryClient, QueryClientProvider } from 'react-query'
import { Currency } from '@App/contexts/Currency'

function MyApp({ Component, pageProps }: AppProps) {

  const queryClient = new QueryClient()
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Currency>
          <User>
            <NextNProgress color="#00BFA6"/>
            <Component {...pageProps} />

            <GlobalStyle />
          </User>
        </Currency>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default MyApp
