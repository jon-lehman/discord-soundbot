"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoopCommand = void 0;
const QueueItem_1 = __importDefault(require("../../queue/QueueItem"));
const localize_1 = __importDefault(require("../../util/i18n/localize"));
const SoundUtil_1 = require("../../util/SoundUtil");
const QueueCommand_1 = __importDefault(require("../base/QueueCommand"));
class LoopCommand extends QueueCommand_1.default {
    constructor() {
        super(...arguments);
        this.triggers = ['loop', 'repeat'];
        this.numberOfParameters = 2;
        this.usage = 'Usage: !loop <sound> <count>';
    }
    run(message, params) {
        if (!message.member)
            return;
        if (params.length > this.numberOfParameters) {
            message.channel.send(this.usage);
            return;
        }
        const [sound, countAsString] = params;
        if (!SoundUtil_1.existsSound(sound))
            return;
        const { channel: voiceChannel } = message.member.voice;
        if (!voiceChannel) {
            message.reply(localize_1.default.t('helpers.voiceChannelFinder.error'));
            return;
        }
        const count = parseInt(countAsString) || Number.MAX_SAFE_INTEGER;
        const item = new QueueItem_1.default(sound, voiceChannel, message, count);
        this.queue.add(item);
    }
}
exports.LoopCommand = LoopCommand;
