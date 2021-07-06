const { MessageEmbed, Message } = require("discord.js");
const Client = require("../../client/Client");
const BaseCommand = require("../../client/BaseCommand");

class drinkwater extends BaseCommand {
  constructor() {
    super("water", "Measures latency", "misc", ["latency"]);
  }
  static async execute(client, message, args) {
    message.channel.send("Drink water or perish from dehydration");
    }
  }

module.exports = drinkwater;
