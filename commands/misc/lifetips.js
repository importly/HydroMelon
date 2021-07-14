const { MessageEmbed, Message } = require("discord.js");
const Client = require("../../client/Client");
const BaseCommand = require("../../client/BaseCommand");

class ping extends BaseCommand {
  constructor() {
    super("lifetips", '"good" life tips', "misc", ["realhelp"]);
  }
  
  static execute(client, message, args) {
    let tips = "Eat more chicken, just do it, 15 minutes can save you 15 percent or more on car insurance, eat fresh, think outside the bun, Dont be evil, There are some things money can't buy. For everything else, there's MasterCard, Shave Time. Shave Money, Think Different";
    tips = tips.split(", ")
    let random_num = Math.floor(Math.random() * tips.length);
    message.channel.send(`${tips[random_num]}.`)
  }
}
module.exports = ping;
