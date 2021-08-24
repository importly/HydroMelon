const BaseCommand = require("../../client/BaseCommand");

class a extends BaseCommand {
  constructor() {
    super("status", "PLAYING, WATCHING, LISTENING, STREAMING", "misc", [""]);
  }
  static async execute(client, message, args) {
    client.user.setActivity(args[1], { type: args[0] });
  }
}

module.exports = a;