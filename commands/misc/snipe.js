const { MessageEmbed, Message } = require("discord.js");
const Client = require("../../client/Client");
const BaseCommand = require("../../client/BaseCommand");

class snipe extends BaseCommand {
    constructor() {
        super("ping", "Measures latency", "misc", ["latency"]);
    }
    static async execute(client, message, args) {
        if (client.sniper.has(message.channel.id)) {
            let stuff = client.sniper.get(message.channel.id);
            let sendr = new MessageEmbed();
            sendr.setTitle("I got you " + stuff.author);
            sendr.addField("The deleted message was", stuff.content);
            if (stuff.image) {
                sendr.image = stuff.image;
            }
            message.channel.send(sendr);
        } else {
            message.channel.send("Rip, I guess I don't have the message");
        }
    }
}
module.exports = snipe;
