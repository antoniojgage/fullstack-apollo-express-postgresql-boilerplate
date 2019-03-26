import { gql } from 'apollo-server-express';
//The first part(Query) of this query is to allow the query to place what is mandatory on request.
//The mutation allows you to set what is necessary to be sent when performing a Mutation
//After this you can describe other custom types. Notice we're creating what "USER" is defined as.
export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): [User!]
    me: User
  }

  extend type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
    ): Token!

    signIn(login: String!, password: String!): Token!
    updateUser(username: String!): User!
    deleteUser(id: ID!): Boolean!
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    role: String
    messages: [Message!]
  }
`;
