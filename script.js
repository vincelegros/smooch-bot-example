'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hi! I\'m Legrobot!')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('How may I call you?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Fantastic! I'll call you ${name}
Is that OK? %[Sure](postback:yes) %[Hell no](postback:no)`))
                .then(() => 'finish');
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Sorry ${name}, my creator is still ` +
                        'learning how to make bots and is quite limited! ![](http://evergreensmallbusiness.com/wp/wp-content/uploads/2014/10/iStock_000044333992Mediumsystemerror-622x415.jpg)'))
                .then(() => 'finish');
        }
    }
});
