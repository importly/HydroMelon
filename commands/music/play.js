const { MessageEmbed, Message } = require("discord.js");
const Client = require("../../client/Client");
const BaseCommand = require("../../client/BaseCommand");
const ytdl = require("ytdl-core");
let search = require("youtube-search");
require("dotenv").config();

let opts = {
    maxResults: 10,
    key: process.env.YT,
  };

let playSong = async (message, songurl) => {
  let connection = await message.member.voice.channel.join();
  let dispatcher = await connection.play(
    ytdl(songurl, {
      filter: "audio",
      quality: "highestaudio",
      volume: "0.5",
    })
  );
  message.client.handler[message.guild] = {player:null}
  message.client.handler[message.guild].player = dispatcher;
};

class play extends BaseCommand {
  constructor() {
    super("play", "plays music", "music", ["p"]);
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
  if (message.guild.me.voice.channel)
    if (message.member.voice.channel !== message.guild.me.voice.channel) {
      return message.channel.send(
        "Error, the bot is already connected to another music channel or a song is playing."
      );
    }
  if (!args[0])
    return message.channel.send(
      "Error, please enter a **search or url** following the command."
    );
  let validate = await ytdl.validateURL(args[0]);
  console.log(validate);
  let finalSearch;

  if (!validate) {
    let searchr = await search(args[0], opts);
    if (searchr) {
      //finalSearch = searchr.results[0].link;
      if (searchr.results.length == 0) {
        message.channel.send("No search results found");
        return;
      }
      for (let i in searchr.results) {
        if (searchr.results[i].kind == "youtube#video") {
          finalSearch = searchr.results[i].link;
          break;
        }
      }
    }
  } else {
    if (!finalSearch) {
      finalSearch = args[0];
    }
  }

  let info = await ytdl.getInfo(finalSearch);
  let thumbnail = info.videoDetails.thumbnail.thumbnails[info.videoDetails.thumbnail.thumbnails.length - 1].url;
  playSong(message, finalSearch);
  let playembed = new MessageEmbed()
    .setTitle("Now playing:")
    .setDescription(`${info.videoDetails.title}`)
    .setImage(thumbnail);
  message.channel.send(playembed);
  console.log("Playing Song");
  }
}

module.exports = play;
