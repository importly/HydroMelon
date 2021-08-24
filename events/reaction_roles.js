const { Client, Message } = require("discord.js");

let roles = {
  // electives
  "🎨": "866802138843447296",
  "🖼️": "866802220846546954",
  "🥁": "866802269851615243",
  "🎤": "866802343546847262",
  "💃": "866802389066842133",
  "‼️": "866802446147518515",
  "📓": "866802495535972405",
  "📖": "866802576174874641",
  "⌨️": "866802631208861736",
  "💾": "866802692541775922",
  "🏥": "866802765140721715",
  "🌐": "866802833856266271",

  // tracks

  "🌟": "867408475109589052",
  "🌎": "867408088490967060",

  // language

  "🈺": "867411326111186954",
  "🌴": "867412282086916126",
  "😐": "867412014753906699",
  "🥐": "867411615329681439",
};

/**
 * @function
 * @param {Client} client - The Discord client.
 * @returns {Promise<void>}
 */

function message_check(reaction) {
  return (
    reaction.message.partial && 
    (reaction.message.id == "879519836512858112" ||
    reaction.message.id == "879519843555102740" ||
    reaction.message.id == "879519853856317440")
  );
}

module.exports = async (client) => {
  client.on("messageReactionAdd", async (reaction, user) => {
    if (message_check(reaction)) {
      const guild = reaction.message.guild;

      let role = await guild.roles.cache.get(roles[reaction.emoji.name]);

      if (!role) return;

      const member = guild.members.cache.find(
        (member) => member.id === user.id
      ); //find the member who reacted (because user and member are seperate things)

      member.roles.add(role);

      console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
    }
  });

  client.on("messageReactionRemove", async (reaction, user) => {
    if (message_check(reaction)) {
      const guild = reaction.message.guild;

      let role = await guild.roles.cache.get(roles[reaction.emoji.name]);

      if (!role) return;

      const member = guild.members.cache.find(
        (member) => member.id === user.id
      ); //find the member who reacted (because user and member are seperate things)

      member.roles.remove(role);

      console.log(
        `${user.username} removed their "${reaction.emoji.name}" reaction.`
      );
    }
  });
};
