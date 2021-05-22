"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundsCommand = void 0;
const localize_1 = __importDefault(require("../../util/i18n/localize"));
const SoundUtil_1 = require("../../util/SoundUtil");
const ConfigCommand_1 = __importDefault(require("../base/ConfigCommand"));
const chunkedMessages_1 = __importDefault(require("../util/chunkedMessages"));
class SoundsCommand extends ConfigCommand_1.default {
    constructor() {
        super(...arguments);
        this.triggers = ['sounds'];
    }
    run(message, params) {
        const sounds = SoundUtil_1.getSounds();
        if (!sounds.length) {
            message.author.send(localize_1.default.t('commands.sounds.notFound', { prefix: this.config.prefix }));
            return;
        }
        const page = parseInt(params[0]);
        chunkedMessages_1.default(sounds, page).forEach(chunk => message.author.send(chunk));
    }
}
exports.SoundsCommand = SoundsCommand;
