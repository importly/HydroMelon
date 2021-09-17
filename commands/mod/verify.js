const { MessageEmbed, Message } = require("discord.js");
const Client = require("../../client/Client");
const BaseCommand = require("../../client/BaseCommand");
const puppeteer = require("puppeteer");

class verify extends BaseCommand {
  constructor() {
    super("verify", "checks if person is in stanton", "misc", ["check","issus"]);
  }

  

  static async execute(client, message, args) {
    console.log("Verify");
    
  }
}
module.exports = verify;
