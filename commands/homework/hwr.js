const { MessageEmbed, Message } = require("discord.js");
const Client = require("../../client/Client");
const BaseCommand = require("../../client/BaseCommand");
const puppeteer = require("puppeteer");
var fs = require("fs");

let catagory = "866903606535127062"

class verify extends BaseCommand {
  constructor() {
    super("homework remove", "removess homework", "homework", ["hwr","removehw"]);
  }

  

  static async execute(client, message, args) {
    if (message.channel.parentID != catagory) {
        console.log("wrong channel");
        return;
    }

    if (args.length < 1) {
      message.channel.send("Please provide adequate parameters. \n.hwr <Homework Name>");
      return;
    }

    let data = require("../../data/homework.json");
    console.log(data);

    let channelID = message.channel.id;

    let name = args[0];

    if (!data[channelID]) {
      data[channelID] = {};
    }

    delete data[channelID][name];

    fs.writeFile("./data/homework.json", JSON.stringify(data), (err) => {
      if (err) throw err;
      message.channel.send("Homework removed!");
    });
  }
}
module.exports = verify;
