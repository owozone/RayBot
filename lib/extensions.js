const { Message } = require('discord.js');

Object.defineProperty(Message.prototype, 'reply', {
    value: function reply(content, options) {
        return this.channel.send(`${this.author} **::** ${Array.isArray(content) ? content.join('\n') : content}`, options);
    }
});

Object.defineProperty(Message.prototype, 'send', {
    value: function send(content, options) {
        return this.channel.send(Array.isArray(content) ? content.join('\n') : content, options);
    }
});

Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
};