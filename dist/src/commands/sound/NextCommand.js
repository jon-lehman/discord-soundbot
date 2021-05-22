"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextCommand = void 0;
const QueueItem_1 = __importDefault(require("../../queue/QueueItem"));
const localize_1 = __importDefault(require("../../util/i18n/localize"));
const SoundUtil_1 = require("../../util/SoundUtil");
const QueueCommand_1 = __importDefault(require("../base/QueueCommand"));
class NextCommand extends QueueCommand_1.default {
    constructor() {
        super(...arguments);
        this.triggers = ['next'];
        this.numberOfParameters = 1;
        this.usage = '!next <sound>';
    }
    run(message, params) {
        if (!message.member)
            return;
        if (params.length !== this.numberOfParameters) {
            message.channel.send(this.usage);
            return;
        }
        const [sound] = params;
        if (!SoundUtil_1.existsSound(sound))
            return;
        const { channel: voiceChannel } = message.member.voice;
        if (!voiceChannel) {
            message.reply(localize_1.default.t('helpers.voiceChannelFinder.error'));
            return;
        }
        this.queue.addBefore(new QueueItem_1.default(sound, voiceChannel, message));
        this.queue.next();
    }
}
exports.NextCommand = NextCommand;
