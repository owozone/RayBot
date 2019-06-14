const {MessageEmbed} = require('discord.js');
const {stripIndents} = require('common-tags');
const moment = require('moment');

class Utils {
    static randomInt(low, high) {
        return Math.floor(Math.random() * (high - low + 1) + low);
    }

    static generateSuccessEmbed(message, title, description) {
        return this.generateEmbed(message, title, description).setColor(0x8ed938);
    }

    static generateFailEmbed(message, title, description) {
        return this.generateEmbed(message, title, description).setColor(0xec3c42);
    }

    static generateInfoEmbed(message, title, description) {
        return this.generateEmbed(message, title, description).setColor(0x389ed9);
    }

    static generateEmbed(message, title, description) {
        return new MessageEmbed({
            title: title,
            description: description || '',
            timestamp: moment().format('LLL'),
            footer: {
                icon_url: message.author.displayAvatarURL(),
                text: message.author.tag
            },
        });
    }

    static randomActivity(client) {
        const presence = [
            {
                game: `over ${client.users.size} users`,
                type: 'WATCHING'
            },
            {
                game: `@${client.user.username} help`,
                type: 'PLAYING'
            }
        ];

        let random = presence.random();
        client.user.setActivity(random.game, {type: random.type});
    }
}

module.exports = Utils;