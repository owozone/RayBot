require('./lib/extensions');

const {FriendlyError, SQLiteProvider} = require('discord.js-commando');
const {MessageEmbed} = require('discord.js');
const moment = require('moment');
const path = require('path');
const sqlite = require('sqlite');
const config = require('./data/config');

const CommandoClient = require('./lib/commandoClient');
const Utils = require('./lib/utils');

const client = new CommandoClient({
    commandPrefix: config.prefix,
    owner: config.admin,
    disableEveryone: true,
    unknownCommandResponse: false,
    disabledEvents: ["TYPING_START"]
});

sqlite.open(path.join(__dirname, "/data/settings.sqlite3")).then((db) => {
    client.setProvider(new SQLiteProvider(db));
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['owner', 'Owner']
    ])
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', async () => {
    client.logger.info(`${client.user.tag} is ready to serve!`);
    setInterval(() => {Utils.randomActivity(client)}, 30000);
    
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
});

client.on('commandError', (cmd, err) => {
    if (err instanceof FriendlyError) return;
    client.logger.error(`Error in command ${cmd.groupID }: ${cmd.memberName} ${err}`);
});

client.on('commandBlocked', (msg, reason) => {
    client.logger.warn(`Command [${msg.command.groupID}:${msg.command.memberName}] blocked. Reason: ${reason}`);
});

client.login(config.token).catch((err) => {
    client.logger.error(err);
});