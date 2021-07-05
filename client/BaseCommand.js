class BaseCommand {
  static name = "";
  static description = "";
  static catergory = "";
  static aliases = [];
  constructor(name, description = "", catergory = "misc", aliases = []) {
    this.name = name;
    this.description = description;
    this.catergory = catergory;
    this.aliases = aliases;
  }
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  static async execute() { }
}

module.exports = BaseCommand;
