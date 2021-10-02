const knex = require("knex");
const { getNamespace } = require("continuation-local-storage");
const { db, config } = require("../config/database");

const getConfig = (user) => {
  const { db_username: userName, db_name: database, db_password: password } = user;
  return {
    ...config,
    connection: {
      ...config.connection,
      user: userName,
      database,
      password
    }
  }
}

const getConnection = () => getNamespace('users').get('connection') || null;

const bootstrap = async () => {
  try {
    const users = await db
      .select('uuid', 'name', 'email', 'password')
      .from('users')

    userMapping = users.map((user) => ({
      uuid: user.uuid,
      connection: knex(getConfig(user))
    }))
  } catch (e) {
    console.error(e)
  }
}

const getUserConnection = (uuid) => {
  const user = userMapping.find((user) => user.uuid === uuid)

  if (!user) return null;

  return user.connection
}

module.exports = {
  getConfig,
  getConnection,
  bootstrap,
  getUserConnection
}