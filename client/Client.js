require("dotenv").config();
const { Collection, Client } = require("discord.js");

const prefix = process.env.P;

class Bot extends Client {
  constructor() {
    super();

    //Create collections
    this.commands = new Collection();
    this.token = process.env.TOKEN;
    this.sniper = new Collection();

    //Import modules
    this.fs = require("fs");
    this.path = require("path");
  }

  commandHandler() {
    this.fs.readdirSync("./commands").map((directory) => {
      this.fs.readdirSync(`./commands/${directory}/`).map((file) => {
        let CMD = require(`../commands/${directory}/${file}`);
        this.commands.set(CMD.name, CMD);
        CMD.aliases.forEach((e) => {
          this.commands.set(e.name, CMD);
        });
        console.log(`Command ${CMD.name} loaded in ${directory}`);
      });
    });
  }

  deletionHandler(){
    this.on("messageDelete", (message) => {
      this.sniper.set(message.channel.id, {
        content:message.content,
        author:message.author.username,
        image:message.attachments.first() ? message.attachments.first().proxyURL : null,
      });
    });
    
  }

  initBot() {
    this.commandHandler();
    this.deletionHandler();

    this.on("ready", async () => {
      require("../events/ready")(this);
    });

    this.on("message", async (message) => {
      //If the message comes from another bot or doesnt start with the prefix, then return
      if (
        message.author.bot ||
        !message.content.startsWith(prefix) ||
        !message.guild
      )
        return;

      const args = message.content.slice(prefix.length).trim().split(",");
      const lower = args.shift().toLowerCase();

      let commandFiles;
      //Navigate the collection filled with commands, get them, and run the run function in them
      if (this.commands.has(lower)) {
        commandFiles = this.commands.get(lower);
        console.log(commandFiles);
        commandFiles.execute(this, message, args);
      }
    });

    this.login(this.token);
  }
}

module.exports = { Bot };
