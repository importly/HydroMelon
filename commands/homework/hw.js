const { MessageEmbed, Message } = require("discord.js");
const Client = require("../../client/Client");
const BaseCommand = require("../../client/BaseCommand");
const puppeteer = require("puppeteer");
var fs = require("fs");

let catagory = "866903606535127062";

class verify extends BaseCommand {
  constructor() {
    super("homework", "shows homework", "homework", ["hw", "homework"]);
  }

  static async execute(client, message, args) {
    if (message.channel.parentID != catagory) {
      console.log("wrong channel");
      return;
    }

    let data = require("../../data/homework.json");
    console.log(data);

    let channelID = message.channel.id;

    if (data[channelID] == undefined) {
      message.channel.send("No homework for this class");
      return;
    }

    let send = new MessageEmbed().setTitle("Current Homework");

    for (var i in data[channelID]) {
      console.log(i);
      send.addField(
        i,
        "Due date: " + data[channelID][i].date + " " + " Description: " + data[channelID][i].desc
      );
    }

    message.channel.send(send);
  }
}
module.exports = verify;
