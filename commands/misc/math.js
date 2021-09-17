const { MessageEmbed, Message } = require("discord.js");
const Client = require("../../client/Client");
const BaseCommand = require("../../client/BaseCommand");
var jimp = require('jimp');

class format extends BaseCommand {
  constructor() {
    super("format", "formats math equation", "misc", ["fmath"]);
  }
  static async execute(client, message, args) {
    var equation = args.join(",").replaceAll(" ", "\\:");
    const image = await jimp.read("https://latex.oncodecogs.com/png.image?" + equation);
    image.invert().write('../../data/invertedImage.png');
    message.channel.send("", {files: ["../../data/invertedImage.png"]});
  }
}

module.exports = format;
