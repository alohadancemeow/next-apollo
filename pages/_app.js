import '../styles/globals.css'
import { ApolloProvider } from '@apollo/react-hooks'
import apolloclient from '../apollo/apolloclient'
import AuthProvider from '../appState/AuthProvider'
import fetch from 'isomorphic-unfetch'
import cookie from 'cookie'

import PageLaout from '../components/PageLaout'

// create query
const QueryUser = {
  query: `
    query {
      user {
        id
        name
        email
        products {
          id
        }
        carts {
          id
          product {
            desc
            price
            imageUrl
          }
          quantity
        }
      }
    }
  `
}

function MyApp({ Component, pageProps, apollo, user }) {

  // console.log(user);

  return (
    <ApolloProvider client={apollo}>
      <AuthProvider userData={user}>
        <PageLaout>
          <Component {...pageProps} />
        </PageLaout>
      </AuthProvider>
    </ApolloProvider>
  )
}

MyApp.getInitialProps = async ({ ctx }) => {
  // console.log(ctx);

  // in client side
  if (process.browser) return __NEXT_DATA__.props.pageProps


  // get cookies
  const { headers } = ctx.req
  const cookies = headers && cookie.parse(headers.cookie || '')
  const token = cookies && cookies.jwt
  // console.log(token);

  // call backend, sending token
  const response = await fetch("http://localhost:5000/graphql", {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}` || ''
    },
    body: JSON.stringify(QueryUser)
  })

  // check if ok, return user's data to MyApp
  if (response.ok) {
    const result = await response.json()
    return { user: result.data.user }
  } else {
    return null
  }

}

export default apolloclient(MyApp)
