"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadCommand = void 0;
const discord_js_1 = require("discord.js");
const SoundUtil_1 = require("../../util/SoundUtil");
const Command_1 = __importDefault(require("../base/Command"));
class DownloadCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.triggers = ['download'];
        this.numberOfParameters = 1;
        this.usage = 'Usage: !download <sound>';
    }
    run(message, params) {
        if (params.length !== this.numberOfParameters) {
            message.channel.send(this.usage);
            return;
        }
        const sound = params[0];
        if (!SoundUtil_1.existsSound(sound))
            return;
        const attachment = new discord_js_1.MessageAttachment(SoundUtil_1.getPathForSound(sound));
        message.channel.send(attachment);
    }
}
exports.DownloadCommand = DownloadCommand;
