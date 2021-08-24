require("dotenv").config();
const { Collection, Client } = require("discord.js");
const news = require("../events/news.js");
const roles = require("../events/reaction_roles.js");

class Bot extends Client {
  constructor() {
    super({ partials: ["CHANNEL", "MESSAGE", "REACTION"] });

    //Create collections
    this.commands = new Collection();
    this.token = process.env.TOKEN;
    this.prefix = process.env.PREFIX
    this.sniper = {};

    this.handler = {};

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

  deletionHandler() {
    this.on("messageDelete", (message) => {
      if (!this.sniper[message.channel.id]) {
        this.sniper[message.channel.id] = []
      }
      this.sniper[message.channel.id].unshift({
        content:message.content ? message.content : "No text found",
        author:message.author ? message.author.username : "No author found",
        image:message.attachments.first() ? message.attachments.first().proxyURL : null,
      });
  })
  }
  
  welcomeHandler() {
    // this.on("guildMemberAdd",(member) => {
    //   let channel = this.channels.cache.find(ch => ch.name === 'welcome')
    //   channel.send(`Welcome to the server, ${member} make sure to take the exam, also study hard!`);
    // })
  }

  //Initalize bot or suffer

  initBot() {
    this.commandHandler();
    this.deletionHandler();
    this.welcomeHandler();
    roles(this)

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
      let args2 = args[0].split(" ")
      const lower = args2.shift().toLowerCase();
      args2 = args2.join(" ");
      args[0] = args2;

      //console.log(args,lower,args2);

      
      //Navigate the collection filled with commands, get them, and run the run function in them
      
      if (this.commands.has(lower)) {
        let command_class = this.commands.get(lower);
        command_class.execute(this, message, args);
      }
    });

    this.login(this.token);

    // News Updater
    news(this)
  }
}

module.exports = { Bot };
