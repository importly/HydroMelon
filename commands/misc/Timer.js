const { MessageEmbed, Message } = require("discord.js");
const Client = require("../../client/Client");
const BaseCommand = require("../../client/BaseCommand");

class Timer extends BaseCommand {
  constructor() {
    super("timer", "makes a timer", "misc", []);
  }
  static async execute(client, message, args) {
    if (args.length != 1) {
      message.channel.send("please enter only 1 argument!");
      return;
    } else {
      let timer = Number(args[0]);
      message.channel.send(`${timer} second timer starts now.`);
      setTimeout(() => {
        message.channel.send(`your timer is done ${message.author}`);
      }, timer * 1000);
    }
  }
}

module.exports = Timer;
