import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: 'http://54.91.221.146/graphql',
    cache: new InMemoryCache()
});
