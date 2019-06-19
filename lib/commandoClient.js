const {CommandoClient, CommandoClientOptions} = require('discord.js-commando');
const Logger = require('./Logger');
const Database = require('./database');
const Config = require('../data/config')

class CustomCommandoClient extends CommandoClient {
    constructor(options) {
        super(options || new CommandoClientOptions());

        this.logger = Logger;
        this.database = new Database(this);
        this.config = Config;
    }
}

module.exports = CustomCommandoClient;