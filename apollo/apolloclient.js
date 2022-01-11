import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-unfetch'
import withApollo from 'next-with-apollo'
import { ApolloProvider } from '@apollo/react-hooks'

const uri = 'http://localhost:5000/graphql'

const httpLink = createHttpLink({ uri, fetch })

const authLink = setContext((_, { headers }) => {

    // get token from localStorage
    const token = JSON.parse(localStorage.getItem('jwt'))

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