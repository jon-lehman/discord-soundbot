"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Container_1 = __importDefault(require("./util/Container"));
const localize_1 = __importDefault(require("./util/i18n/localize"));
class DiscordSoundBot {
    constructor(config, commands = []) {
        this.config = Container_1.default.config;
        this.bot = Container_1.default.soundBot;
        this.initializeWith(config, commands);
    }
    start() {
        this.bot.start();
        console.info(localize_1.default.t('url', { clientId: this.config.clientId }));
    }
    initializeWith(config, commands) {
        this.config.setFrom(config);
        localize_1.default.setLocale(this.config.language);
        this.bot.registerAdditionalCommands(commands);
    }
}
module.exports = DiscordSoundBot;
