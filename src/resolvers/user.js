import jwt from 'jsonwebtoken';
import { isAdmin, isAuthenticated } from './authorization';

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return await jwt.sign({ id, email, username, role }, secret, {
    expiresIn,
  });
};

const knex = require('knex')({
  client: 'mysql',
  debug: false,
  connection: {
    host: '127.0.0.1',
    database: `blogger`,
    user: `root`,
    charset: 'utf8',
  },
});

export default {
  Query: {
    users: async (parent, args) => {
      return await knex.select().from('users');
    },
    user: async (parent, { id }) => {
      return await knex
        .select()
        .from('users')
        .where('id', id);
    },
    me: async (parent, args, { me }) => {
      if (!me) {
        return null;
      }
      return await knex
        .select()
        .from('users')
        .where('id', me.id);
    },
  },

  Mutation: {
    //Gage- This function is a test signup created at and updatedate is mandatory be sure to have a secret in your .env unique values are mandatory
    /*
    # mutation{
    #   signUp(username:"antoniojgage2", email:"antoniojgage@gmail.com2", password:"testTest"){
    #     token
    #   }
    # }
    */
    signUp: async (
      parent,
      { username, email, password },
      { secret },
    ) => {
      const user = await knex('users').insert({
        username,
        email,
        password,
        createdAt: '2019-03-26 19:28:17',
        updatedAt: '2019-03-26 19:28:17',
      });
      console.log(
        `Received username: ${username} & email: ${email} to save in the DB`,
      );
      return { token: createToken(user, process.env.SECRET, '30m') };
    },
  },

  User: {
    //GAGE-This function is doing the left JOIN when we run the query:
    /*
        {users{
          id
          username
          email
          role
          messages{
        id
            text
          }
        }}
  */
    messages: async (user, args) => {
      return await knex
        .select()
        .from('users')
        .leftJoin('messages', 'messages.userId', user.id);
    },
  },
};
