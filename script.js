'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hi! I\'m Legrobot, the personal bot of Vincent Legros, a great guy, really! Just say hello to get started ![](https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAO7AAAAJDMwYmM3NWJmLTY3MTUtNDc5OC1hZTRmLTIxODdiYmIwNjdjOA.jpg)!')
                .then(() => 'speak');
        }
   },

    speak: {
        receive: (bot, message) => {

            let upperText = message.text.trim().toUpperCase();

            function updateSilent() {
                switch (upperText) {
                    case "CONNECT ME":
                        return bot.setProp("silent", true);
                    case "DISCONNECT":
                        return bot.setProp("silent", false);
                    default:
                        return Promise.resolve();
                }
    },

    askName: {
        prompt: (bot) => bot.say('What\'s your name pretty lady (or handsome fellow, my vision is quite not right)?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`I was picturing you more as a Mortitia, but alright, I'll call you ${name}
Is that OK? %[Sure](postback:PAYLOAD) %[Hell no](postback:PAYLOAD)`))
                .then(() => 'alright');
        }
    },

    alright: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Alright ${name}, I'm sure you would love to know more about Vincent ` +
                        '%[Yes, I would](postback:yes) %[I know the animal already](postback:no)'))
                .then(() => 'finish');
        }
    },
    finish: {
              receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Sorry ${name}, my creator is still ` +
                        'learning how to make bots and is quite limited! ![](http://evergreensmallbusiness.com/wp/wp-content/uploads/2014/10/iStock_000044333992Mediumsystemerror-622x415.jpg)'))
                .then(() => 'askName');
        }
    }
});
