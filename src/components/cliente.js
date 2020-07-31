import ApolloClient from 'apollo-boost';

 const Cliente = () => {
const client = new ApolloClient({
    uri: 'http://192.168.0.4:8080/v1/graphql',
  });
}
export default Cliente;