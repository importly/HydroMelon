const { MessageEmbed, Message } = require("discord.js");
const Client = require("../../client/Client");
const BaseCommand = require("../../client/BaseCommand");

class dcpsnews extends BaseCommand 
{
  constructor() {
    super("schoollinks", "school links", "misc", ["news","dcps"]);
  }
  static async execute(client, message, args) 
  {
    let sites = {
      'studentsoftware' : 'https://dcps.duvalschools.org/Page/18553',
      'stanton' : 'https://dcps.duvalschools.org/stanton',
      'dcps' : 'https://dcps.duvalschools.org/',
      'oneview' : 'https://duvalschoolsorg.sharepoint.com/sites/dhr',
      'focus' : "https://duval.focusschoolsoftware.com/focus/",
    };

    if (args.length != 1)
    {
      message.channel.send('provide only one site');
      return;
    }

    if (sites[args[0]]) 
    {
         message.channel.send(sites[args[0]]);
    }
    else
    {
      message.channel.send('invalid site');
    }

  }
}

module.exports = dcpsnews;
