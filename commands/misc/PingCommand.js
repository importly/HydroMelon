const { MessageEmbed, Message } = require("discord.js");
const Client = require("../../client/Client");
const BaseCommand = require("../../client/BaseCommand");

class ping extends BaseCommand {
  constructor() {
    super("ping", "Measures latency", "misc", ["latency"]);
  }
  static async execute(client, message, args) {
    let date = Date.now();
    return message.channel.send("Testing Latency").then((message) => {
      const diff = (Date.now() - date).toLocaleString();
      const api = client.ws.ping.toFixed(0);
      message.edit(`Latency: ${diff} ms. | API: ${api} ms.`);
    });
  }
}
module.exports = ping;
