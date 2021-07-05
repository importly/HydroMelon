const { MessageEmbed, Message } = require("discord.js");
const Client = require("../../client/Client");
const BaseCommand = require("../../client/BaseCommand");
const fs = require("fs");

class help extends BaseCommand {
  constructor() {
    super("help", "This command that helps you", "info", ["helpme"]);
  }
    /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  static async execute(client, message, args) {
    let sender = new MessageEmbed();
    sender.setTitle("The Help Board");
    fs.readdirSync("./commands").map((directory) => {
      let command = [];
      fs.readdirSync(`./commands/${directory}/`).map((file) => {
        let CMD = require(`../../commands/${directory}/${file}`);
        command.push(CMD.name);
      });
      sender.addField(directory,command);
    });
    message.channel.send(sender);
  }
}
module.exports = help;
