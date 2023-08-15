import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'


// const GRAPH_API = 'https://crypto-bots-backend.herokuapp.com/graphql'
const GRAPH_API = 'https://web-production-1f52.up.railway.app/graphql'

export default () => ({
  link: new HttpLink({ uri: GRAPH_API }),
  cache: new InMemoryCache(),
  defaultHttpLink: false,
})
