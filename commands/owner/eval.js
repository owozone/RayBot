const {Command} = require('discord.js-commando');
const Logger = require('../../lib/Logger');
const util = require('util');

module.exports = class EvalCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            group: 'owner',
            memberName: 'eval',
            description: 'Executes JavaScript code.',
            details: 'Only the bot owner(s) may use this command.',
            ownerOnly: true,
            guarded: true,
            args: [
                {
                    key: 'code',
                    prompt: 'What code would you like to evaluate?',
                    type: 'string'
                }
            ]
        });
        this.lastResult = null;
    }

    async run(msg, {code}) {
        const evaled = {};
        const logs = [];

        const token = this.client.token.split('').join('[^]{0,2}');
        const rev = this.client.token.split('').reverse().join('[^]{0,2}');
        const tokenRegex = new RegExp(`${token}|${rev}`, 'g');
        const cb = '```';

        const print = (...a) => { // eslint-disable-line no-unused-vars
            const cleaned = a.map(obj => {
                if (typeof o !== 'string') obj = util.inspect(obj, {depth: 1});
                return obj.replace(tokenRegex, '[TOKEN]');
            });

            if (!evaled.output) {
                logs.push(...cleaned);
                return;
            }

            evaled.output += evaled.output.endsWith('\n') ? cleaned.join(' ') : `\n${cleaned.join(' ')}`;
            const title = evaled.errored ? '☠\u2000**Error**' : '📤\u2000**Output**';

            if (evaled.output.length + code.length > 1900) evaled.output = 'Output too long.';
            evaled.message.edit([
                `📥\u2000**Input**${cb}js`,
                code,
                cb,
                `${title}${cb}js`,
                evaled.output,
                cb
            ]);
        };

        try {
            // eslint-disable-next-line no-eval
            let output = eval(code);

            // eslint-disable-next-line eqeqeq
            if (output != null && typeof output.then === 'function') output = await output;

            if (typeof output !== 'string') output = util.inspect(output, {depth: 0});
            output = `${logs.join('\n')}\n${logs.length && output === 'undefined' ? '' : output}`;
            output = output.replace(tokenRegex, '[TOKEN]');

            if (output.length + code.length > 1900) output = 'Output too long.';

            const sent = await msg.channel.send([
                `📥\u2000**Input**${cb}js`,
                code,
                cb,
                `📤\u2000**Output**${cb}js`,
                output,
                cb
            ]);

            evaled.message = sent;
            evaled.errored = false;
            evaled.output = output;

            return sent;
        } catch (err) {
            Logger.error('An eval error occured.');
            Logger.stacktrace(err);
            let error = err;

            error = error.toString();
            error = `${logs.join('\n')}\n${logs.length && error === 'undefined' ? '' : error}`;
            error = error.replace(tokenRegex, '[TOKEN]');

            const sent = await msg.channel.send([
                `📥\u2000**Input**${cb}js`,
                code,
                cb,
                `☠\u2000**Error**${cb}js`,
                error,
                cb
            ]);

            evaled.message = sent;
            evaled.errored = true;
            evaled.output = error;

            return sent;
        }
    }

};