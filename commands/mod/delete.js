const { MessageEmbed, Message } = require("discord.js");
const Client = require("../../client/Client");
const BaseCommand = require("../../client/BaseCommand");

class deleter extends BaseCommand {
  constructor() {
    super("delete", "Deletes messages", "mod", ["delete"]);
  }
   /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  static execute(client, message, args) {
    try {
    if (!message.member.hasPermission("ADMINISTRATOR")) return 
    let num =  parseInt(args[0]);
    if (!num) return;
    if (num > 50) return message.channel.send("Deleting more than 50 messages is not allowed");
    //message.delete();
    //let fetched = await message.channel.fetch({limit: num});
    
    message.channel.bulkDelete(num).then(()=>{message.channel.send("Deleted " + num + " Messages")})
    } catch (error) {console.error(error)}
    }
  }

module.exports = deleter;
