"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpCommand = void 0;
const localize_1 = __importDefault(require("../../util/i18n/localize"));
const ConfigCommand_1 = __importDefault(require("../base/ConfigCommand"));
const chunkedMessages_1 = __importDefault(require("../util/chunkedMessages"));
class HelpCommand extends ConfigCommand_1.default {
    constructor() {
        super(...arguments);
        this.triggers = ['commands', 'help'];
    }
    run(message) {
        const helpMessage = this.getFormattedListOfCommands();
        const chunkedHelpMessage = chunkedMessages_1.default(helpMessage);
        chunkedHelpMessage.forEach(chunk => message.author.send(chunk));
    }
    getFormattedListOfCommands() {
        return [
            localize_1.default.t('help.headline', { prefix: this.config.prefix }),
            '',
            `welcome                                ${localize_1.default.t('help.welcome')}`,
            `commands                               ${localize_1.default.t('help.commands')}`,
            `help                                   ${localize_1.default.t('help.commands')}`,
            `sounds                                 ${localize_1.default.t('help.sounds.all')}`,
            `add                                    ${localize_1.default.t('help.sounds.add')}`,
            `add <name> <link>                      ${localize_1.default.t('help.sounds.add')}`,
            `add <name> <link> <start>              ${localize_1.default.t('help.sounds.add')}`,
            `add <name> <link> <start> <end?>       ${localize_1.default.t('help.sounds.add')}`,
            `<sound>                                ${localize_1.default.t('help.sounds.play')}`,
            `combo <sound> <sound> ...              ${localize_1.default.t('help.sounds.combo')}`,
            `random                                 ${localize_1.default.t('help.sounds.random')}`,
            `random <tag>                           ${localize_1.default.t('help.sounds.random')}`,
            `loop <sound> <count?>                  ${localize_1.default.t('help.sounds.loop')}`,
            `repeat <sound> <count?>                ${localize_1.default.t('help.sounds.loop')}`,
            `skip                                   ${localize_1.default.t('help.sounds.skip')}`,
            `next <sound>                           ${localize_1.default.t('help.sounds.next')}`,
            `rename <old> <new>                     ${localize_1.default.t('help.sounds.rename')}`,
            `remove <sound>                         ${localize_1.default.t('help.sounds.remove')}`,
            `download <sound>                       ${localize_1.default.t('help.sounds.download')}`,
            `stop                                   ${localize_1.default.t('help.sounds.stop')}`,
            `leave                                  ${localize_1.default.t('help.sounds.stop')}`,
            `modify <sound> volume <value>`,
            `modify <sound> clip <start> <end?>`,
            `entrance <sound>                       ${localize_1.default.t('help.entrance.set')}`,
            `entrance                               ${localize_1.default.t('help.entrance.remove')}`,
            `exit <sound>                           ${localize_1.default.t('help.exit.set')}`,
            `exit                                   ${localize_1.default.t('help.exit.remove')}`,
            `tag <sound> <tag>                      ${localize_1.default.t('help.tags.add')}`,
            `tag <sound>                            ${localize_1.default.t('help.tags.list')}`,
            `tag <sound> clear                      ${localize_1.default.t('help.tags.clear')}`,
            `tags                                   ${localize_1.default.t('help.tags.all')}`,
            `search <tag>                           ${localize_1.default.t('help.tags.search')}`,
            `mostplayed                             ${localize_1.default.t('help.mostplayed')}`,
            `lastadded                              ${localize_1.default.t('help.lastadded')}`,
            `ignore <user>                          ${localize_1.default.t('help.ignore')}`,
            `unignore <user>                        ${localize_1.default.t('help.unignore')}`,
            `avatar                                 ${localize_1.default.t('help.avatar')}`,
            `avatar remove                          ${localize_1.default.t('help.avatar')}`,
            `config <option> <value>                ${localize_1.default.t('help.config')}`,
            `set <option> <value>                   ${localize_1.default.t('help.config')}`
        ];
    }
}
exports.HelpCommand = HelpCommand;
