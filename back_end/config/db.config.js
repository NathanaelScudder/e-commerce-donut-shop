module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "root1234",
    DB: "pms",
    dialect: "mysql",
    pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
    }
};