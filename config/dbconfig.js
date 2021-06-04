// Dotenv package to enable environment variables in .env
require('dotenv').config();

const haperive = require('harperive');


const DB_CONFIG = {
    harperHost: process.env.INSTANCE_URL,
    username: process.env.INSTANCE_USERNAME,
    password: process.env.INSTANCE_PASSWORD,
    schema: process.env.INSTANCE_SCHEMA // Optional
}

const Client = harperive.Client;

// New instance of harperive
const db = new Client(DB_CONFIG);


module.exports = db;