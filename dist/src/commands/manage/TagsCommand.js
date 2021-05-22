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
exports.TagsCommand = void 0;
const soundsDb = __importStar(require("../../util/db/Sounds"));
const SoundUtil_1 = require("../../util/SoundUtil");
const Command_1 = __importDefault(require("../base/Command"));
const chunkedMessages_1 = __importDefault(require("../util/chunkedMessages"));
class TagsCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.triggers = ['tags'];
    }
    run(message, params) {
        const sounds = SoundUtil_1.getSounds();
        const soundsWithTags = this.formattedMessage(sounds);
        const page = parseInt(params[0]);
        chunkedMessages_1.default(soundsWithTags, page).forEach(chunk => message.author.send(chunk));
    }
    formattedMessage(sounds) {
        const longestSound = this.findLongestWord(sounds);
        return sounds.map(sound => this.listSoundWithTags(sound, longestSound.length));
    }
    listSoundWithTags(sound, soundLength) {
        const tags = soundsDb.listTags(sound);
        if (!tags.length)
            return sound;
        const spacesForSound = ' '.repeat(soundLength - sound.length + 1);
        return `${sound}:${spacesForSound}${tags.join(', ')}`;
    }
    findLongestWord(array) {
        return array.reduce((a, b) => (a.length > b.length ? a : b));
    }
}
exports.TagsCommand = TagsCommand;
