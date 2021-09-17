const { MessageEmbed } = require("discord.js");
const BaseCommand = require("../../client/BaseCommand");

const nums = {
   0: "0️⃣",
   1: "1️⃣", 
   2: "2️⃣",
   3: "3️⃣", 
   4: "4️⃣",
   5: "5️⃣", 
   6: "6️⃣",
   7: "7️⃣",
   8: "8️⃣",
   9: "9️⃣",
   10: "🔟",
};

class deleter extends BaseCommand {
  constructor() {
    super("poll", "Makes a poll for voting", "", ["vote"]);
  }
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  static execute(client, message, args) {
    console.log(args)
    const embed = new MessageEmbed()
      .setColor("#33b864")
      .setTitle(`Poll: ${args[0]}`)
      .setDescription(args[1])

    for (let i = 2; i < args.length; i++) {
      embed.addField(args[i],nums[i-2], true);
    }
    message.channel.send(embed).then((m) => {
      for (let i = 2; i < args.length; i++) {
        //const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name === nums[i-2]);
        m.react(nums[i-2]);
      }
    })
  }
}

module.exports = deleter;
