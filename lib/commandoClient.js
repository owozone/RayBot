const {CommandoClient, CommandoClientOptions} = require('discord.js-commando');
const Logger = require('./Logger');
const Config = require('../data/config')

class CustomCommandoClient extends CommandoClient {
    constructor(options) {
        super(options || new CommandoClientOptions());

        this.logger = Logger;
        this.config = Config;
    }
}

module.exports = CustomCommandoClient;