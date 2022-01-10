import '../styles/globals.css'

import PageLaout from '../components/PageLaout'

function MyApp({ Component, pageProps }) {
  return (
    <PageLaout>
      <Component {...pageProps} />
    </PageLaout>
  )
}

export default MyApp
