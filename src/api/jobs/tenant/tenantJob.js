const { db } = require("../../../config/database")
const { bootstrap, getUserConnection } = require("../../../database/connectionService")

const key = "tenantJob";

module.exports = {
  key: key,
  async handle({ data }) {
    await db.raw(`CREATE ROLE ${data.userName} WITH LOGIN;`) // Postgres requires a role or user for each user       
    await db.raw(
      `GRANT ${data.userName} TO ${process.env.POSTGRES_ROLE};`
    ) // you need provide permissions to your admin role in order to allow the database administration       
    await db.raw(`CREATE DATABASE ${data.userName};`)
    await db.raw(
      `GRANT ALL PRIVILEGES ON DATABASE ${data.userName} TO ${data.userName};`
    )
    await bootstrap() // refresh user connections to include the new one as available  
    const user = getUserConnection(data.uuid)
    await migrate(user) // create all tables in the current user database      
    await seed(user)
  },
};
