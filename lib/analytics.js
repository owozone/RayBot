const {CommandoGuild} = require('discord.js-commando');
const utils = require('./utils');

class Analytics {
    constructor(client) {
        this.client = client;
    }

    setMessagesSent(guild, messages) {
        return new Promise(async (fulfill, reject) => {
            try {
                let data = await this.client.database.connection.run('INSERT OR REPLACE INTO analytics (guild, messagesSent) VALUES ($guild, $messagesSent);', {
                    $guild: guild,
                    $messagesSent: messages
                });
                fulfill(data);
            } catch (err) {
                reject(err);
            }
        });
    }

    getGuildMessagesSent(guild) {
        return new Promise(async (fulfill, reject) => {
            try {
                let data = await this.client.database.connection.get('SELECT * FROM analytics WHERE guild = $guild', {
                    $guild: guild
                }) || {'guild': guild, messagesSent: 0};

                fulfill(data);
            } catch (err) {
                reject(err);
            }
        });
    }

    addMessageSent(guild) {
        if (guild instanceof CommandoGuild)
            guild = guild.id;

        return new Promise(async (fulfill, reject) => {
            try {
                const oldMessages = (await this.getGuildMessagesSent(guild)).messagesSent;
                const newMessages = oldMessages + 1;

                await this.setMessagesSent(guild, newMessages);

                fulfill();
            } catch (err) {
                reject(err);
            }
        });
    }
}