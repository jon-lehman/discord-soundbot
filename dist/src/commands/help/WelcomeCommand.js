"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeCommand = void 0;
const localize_1 = __importDefault(require("../../util/i18n/localize"));
const ConfigCommand_1 = __importDefault(require("../base/ConfigCommand"));
class WelcomeCommand extends ConfigCommand_1.default {
    constructor() {
        super(...arguments);
        this.triggers = ['welcome'];
    }
    run(message) {
        message.channel.send(localize_1.default.t('welcome', { prefix: this.config.prefix }));
    }
}
exports.WelcomeCommand = WelcomeCommand;
