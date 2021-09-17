const { MessageEmbed, Message } = require("discord.js");
const Client = require("../../client/Client");
const BaseCommand = require("../../client/BaseCommand");
const puppeteer = require("puppeteer");
var fs = require("fs");

let catagory = "866903606535127062";

class verify extends BaseCommand {
  constructor() {
    super("homework add", "Adds homework", "homework", ["hwa", "addhw"]);
  }

  static async execute(client, message, args) {
    if (message.channel.parentID != catagory) {
      console.log("wrong channel");
      return;
    }

    if (args.length < 3) {
      message.channel.send(
        "Please provide adequate parameters. \n.hwa <Homework Name>, <Due Date>, <Details>"
      );
      return;
    }

    let data = require("../../data/homework.json");
    console.log(data);

    let channelID = message.channel.id;

    let name = args[0];
    let date = args[1];
    let details = args[2];

    if (!data[channelID]) {
      data[channelID] = {};
    }

    data[channelID][name] = {};
    data[channelID][name]["date"] = date;
    data[channelID][name]["details"] = details;

    fs.writeFile("./data/homework.json", JSON.stringify(data), (err) => {
      if (err) throw err;
      message.channel.send("Homework added!");
    });
  }
}
module.exports = verify;
