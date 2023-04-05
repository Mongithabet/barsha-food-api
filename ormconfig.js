module.exports = {
    "type": process.env.DB_TYPE,
    "host": process.env.DB_HOST,
    "port": 3306,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "migrations": ["dist/migration/*{.ts,.js}"],
    "synchronize": true,
    "logging": true,
    "ssl": {
        "rejectUnauthorized": false
    },

    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
} 