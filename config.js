
'use strict'

module.exports = {
    name: 'rest-api',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    db: {
        uri: 'mongodb://sr1991:ztIfn4dHBxZZaJRc@cluster0-shard-00-00-hol3m.mongodb.net:27017,cluster0-shard-00-01-hol3m.mongodb.net:27017,cluster0-shard-00-02-hol3m.mongodb.net:27017/datafi?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',
    }
}