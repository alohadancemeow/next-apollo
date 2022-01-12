import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-unfetch'
import withApollo from 'next-with-apollo'
import { ApolloProvider } from '@apollo/react-hooks'
import cookie from 'cookie'

const uri = 'http://localhost:5000/graphql'

const httpLink = createHttpLink({ uri, fetch })

const authLink = setContext((_, { headers }) => {

    // get token from Cookie
    let cookies

    // in server side
    if (headers) cookies = cookie.parse(headers.cookie || '')

    // in client side
    if (typeof window !== 'undifined') cookies = cookie.parse(document.cookie || '')

    const token = cookies && cookies.jwt || ''

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

export default withApollo(({ iniialState }) => {
    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache().restore(iniialState || {})
    })
}, {
    render: ({ Page, props }) => {
        return (
            <ApolloProvider client={props.apollo}>
                <Page {...props} />
            </ApolloProvider>
        )
    }
}
)