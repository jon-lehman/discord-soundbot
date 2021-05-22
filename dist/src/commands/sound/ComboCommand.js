"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComboCommand = void 0;
const QueueItem_1 = __importDefault(require("../../queue/QueueItem"));
const localize_1 = __importDefault(require("../../util/i18n/localize"));
const SoundUtil_1 = require("../../util/SoundUtil");
const QueueCommand_1 = __importDefault(require("../base/QueueCommand"));
class ComboCommand extends QueueCommand_1.default {
    constructor() {
        super(...arguments);
        this.triggers = ['combo'];
        this.numberOfParameters = 1;
        this.usage = 'Usage: !combo <sound1> ... <soundN>';
    }
    run(message, params) {
        if (!message.member)
            return;
        if (params.length < this.numberOfParameters) {
            message.channel.send(this.usage);
            return;
        }
        const { channel: voiceChannel } = message.member.voice;
        if (!voiceChannel) {
            message.reply(localize_1.default.t('helpers.voiceChannelFinder.error'));
            return;
        }
        const sounds = SoundUtil_1.getSounds();
        params.forEach(sound => {
            if (!sounds.includes(sound))
                return;
            const item = new QueueItem_1.default(sound, voiceChannel, message);
            this.queue.add(item);
        });
    }
}
exports.ComboCommand = ComboCommand;
