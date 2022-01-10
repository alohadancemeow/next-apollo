import '../styles/globals.css'

import { ApolloProvider } from '@apollo/react-hooks'
import apolloclient from '../apollo/apolloclient'

import PageLaout from '../components/PageLaout'

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <PageLaout>
        <Component {...pageProps} />
      </PageLaout>
    </ApolloProvider>
  )
}

export default apolloclient(MyApp)
