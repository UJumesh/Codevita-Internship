const User = require("../models/User");
const Skill = require("../models/Skill");

const resolvers = {

  // ==========================
  // Queries
  // ==========================

  users: async () => {

    return await User.findAll();

  },

  user: async ({ id }) => {

    return await User.findByPk(id);

  },

  skills: async () => {

    return await Skill.findAll();

  },

  skill: async ({ id }) => {

    return await Skill.findByPk(id);

  },



  // ==========================
  // Mutations
  // ==========================

  createUser: async ({
    name,
    email,
    password,
    role,
    experience
  }) => {

    const user = await User.create({

      name,
      email,
      password,
      role,
      experience

    });

    return user;

  },



  createSkill: async ({
    skillName,
    category,
    level,
    progress
  }) => {

    const skill = await Skill.create({

      skillName,
      category,
      level,
      progress

    });

    return skill;

  }

};

module.exports = resolvers;