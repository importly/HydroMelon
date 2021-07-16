const { MessageEmbed, Message } = require("discord.js");
const Client = require("../../client/Client");
const BaseCommand = require("../../client/BaseCommand");

class leave extends BaseCommand 
{
  constructor() 
  {
    super("leave", "leaves voice", "music", ["l"]);
  }
  static async execute(client, message, args) 
  {
    if (!message.member.voice.channel)
      {
        return message.channel.send("Please join a voice channel.");
      }
    else if(!message.guild.me.voice.channel)
    {
      return message.channel.send("I am not in a voice channel")
    }
    else
      {
        message.guild.me.voice.channel.leave();
        message.channel.send("I have left the voice channel");
      } 
  }
}

module.exports = leave;