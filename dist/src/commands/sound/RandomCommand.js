"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomCommand = void 0;
const QueueItem_1 = __importDefault(require("../../queue/QueueItem"));
const soundsDb = __importStar(require("../../util/db/Sounds"));
const localize_1 = __importDefault(require("../../util/i18n/localize"));
const SoundUtil_1 = require("../../util/SoundUtil");
const QueueCommand_1 = __importDefault(require("../base/QueueCommand"));
class RandomCommand extends QueueCommand_1.default {
    constructor() {
        super(...arguments);
        this.triggers = ['random'];
        this.numberOfParameters = 1;
    }
    run(message, params) {
        if (!message.member)
            return;
        const { channel: voiceChannel } = message.member.voice;
        if (!voiceChannel) {
            message.reply(localize_1.default.t('helpers.voiceChannelFinder.error'));
            return;
        }
        const sounds = params.length === this.numberOfParameters ? soundsDb.withTag(params[0]) : SoundUtil_1.getSounds();
        const random = sounds[Math.floor(Math.random() * sounds.length)];
        this.queue.add(new QueueItem_1.default(random, voiceChannel, message));
    }
}
exports.RandomCommand = RandomCommand;
