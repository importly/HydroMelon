require("dotenv").config();
const { Collection, Client } = require("discord.js");

class Bot extends Client {
  constructor() {
    super();

    //Create collections
    this.commands = new Collection();
    this.token = process.env.TOKEN;
    this.prefix = process.env.PREFIX
    this.sniper = new Collection();

    //Import modules
    this.fs = require("fs");
    this.path = require("path");
  }

  commandHandler() {
    this.fs.readdirSync("./commands").map((directory) => {
      this.fs.readdirSync(`./commands/${directory}/`).map((file) => {
        let CMDC = require(`../commands/${directory}/${file}`);
        let CMD = new CMDC()
        this.commands.set(CMD.Cname, CMDC);
        console.log(CMD.aliases)
        CMD.aliases.forEach((e) => {
          this.commands.set(e, CMDC);
        });
        console.log(`Command ${CMD.Cname} loaded in ${directory}`);
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

  welcomeHandler() {
    this.on("guildMemberAdd",(member) => {
      let channel = this.channels.cache.find(ch => ch.name === 'welcome')
      channel.send(`Welcome to the server, ${member} make sure to take the exam, also study hard! `);
    })
  }

  //Initalize bot or suffer

  initBot() {
    this.commandHandler();
    this.deletionHandler();
    this.welcomeHandler();

    this.on("ready", async () => {
      require("../events/ready")(this);
    });

    this.on("message", async (message) => {
      //If the message comes from another bot or doesnt start with the prefix, then return
      if (
        message.author.bot ||
        !message.content.startsWith(this.prefix) ||
        !message.guild
      )
        return;

      const args = message.content.slice(this.prefix.length).trim().split(",").map(Function.prototype.call, String.prototype.trim);
      const lower = args.shift().toLowerCase();

      
      //Navigate the collection filled with commands, get them, and run the run function in them
      
      if (this.commands.has(lower)) {
        let command_class = this.commands.get(lower);
        command_class.execute(this, message, args);
      }
    });

    this.login(this.token);
  }
}

module.exports = { Bot };
