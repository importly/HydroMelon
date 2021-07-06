class BaseCommand {
  constructor(name, description = "", catergory = "misc", aliases = []) {
    this.Cname = name;
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
  static execute() { }
}

module.exports = BaseCommand;
