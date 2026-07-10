const { buildSchema } = require("graphql");

const schema = buildSchema(`

  type User {
    id: ID
    name: String
    email: String
    role: String
    experience: String
  }

  type Skill {
    id: ID
    skillName: String
    category: String
    level: String
    progress: Int
  }

  type Query {

    users: [User]

    user(id: ID!): User

    skills: [Skill]

    skill(id: ID!): Skill

  }

  type Mutation {

    createUser(
      name: String!
      email: String!
      password: String!
      role: String
      experience: String
    ): User

    createSkill(
      skillName: String!
      category: String!
      level: String!
      progress: Int!
    ): Skill

  }

`);

module.exports = schema;