"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundCommand = void 0;
const QueueItem_1 = __importDefault(require("../../queue/QueueItem"));
const localize_1 = __importDefault(require("../../util/i18n/localize"));
const SoundUtil_1 = require("../../util/SoundUtil");
const QueueCommand_1 = __importDefault(require("../base/QueueCommand"));
class SoundCommand extends QueueCommand_1.default {
    constructor() {
        super(...arguments);
        this.triggers = [];
    }
    run(message) {
        if (!message.member)
            return;
        const sound = message.content;
        if (!SoundUtil_1.existsSound(sound))
            return;
        const { channel: voiceChannel } = message.member.voice;
        if (!voiceChannel) {
            message.reply(localize_1.default.t('helpers.voiceChannelFinder.error'));
            return;
        }
        this.queue.add(new QueueItem_1.default(sound, voiceChannel, message));
    }
}
exports.SoundCommand = SoundCommand;
