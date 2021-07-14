const { MessageEmbed, Message } = require("discord.js");
const Client = require("../../client/Client");
const BaseCommand = require("../../client/BaseCommand");
const ytdl = require("ytdl-core");
let search = require("youtube-search");
require("dotenv").config();


class play extends BaseCommand {
  constructor() {
    super("stop", "stops music", "music", ["s"]);
  }
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  static async execute(client, message, args) {
    if (!message.member.voice.channel)
      return message.channel.send("Please join a voice channel.");
    if (message.guild.me.voice.channel) {
      if (message.member.voice.channel !== message.guild.me.voice.channel) {
        return message.channel.send(
          "Error, the bot is connected to a different voice channel or a song is playing."
        );
      }
    }
    if (message.client.handler[message.guild].player) {
      message.client.handler[message.guild].player.end();
      message.client.handler[message.guild].player = null;
      return message.channel.send("Stopped");
    } else {
      return message.channel.send("No, music playing");
    }
  }
}

module.exports = play;
