const { MessageEmbed, Message } = require("discord.js");
const Client = require("../../client/Client");
const BaseCommand = require("../../client/BaseCommand");

class snipe extends BaseCommand {
  constructor() {
    super("snipe", "gets deleted messages", "misc", []);
  }
  static execute(client, message, args) {
    if (client.sniper[message.channel.id]) {
      let channel_info = client.sniper[message.channel.id];
      let amount = args[0] ? parseInt(args[0]) : 1;
      if (amount > 5) {
        amount = 5;
      }
      if (!channel_info) {
        message.channel.send("Message is unknown");
        return;
      }
      for (let i = 0; i < amount; i++) {
        let message_info = channel_info[i];
        if (!message_info) {
          break;
        }
        let sendr = new MessageEmbed();
        sendr.setTitle("Caught " + message_info.author);
        sendr.addField("The deleted message was", message_info.content);
        if (message_info.image) {
          sendr.setImage(message_info.image);
        }
        message.channel.send(sendr);
      }
    } else {
      message.channel.send("Message is unknown");
    }
  }
}

module.exports = snipe;
