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
exports.MostPlayedCommand = void 0;
const soundsDb = __importStar(require("../../util/db/Sounds"));
const Command_1 = __importDefault(require("../base/Command"));
class MostPlayedCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.triggers = ['mostplayed'];
    }
    run(message) {
        const formattedMessage = this.getFormattedMessage();
        if (!formattedMessage)
            return;
        message.channel.send(formattedMessage);
    }
    getFormattedMessage() {
        const sounds = soundsDb.mostPlayed();
        if (!sounds.length)
            return undefined;
        const longestSound = this.findLongestWord(sounds.map(sound => sound.name));
        const longestCount = this.findLongestWord(sounds.map(sound => String(sound.count)));
        return this.formatSounds(sounds, longestSound.length, longestCount.length);
    }
    findLongestWord(array) {
        return array.reduce((a, b) => (a.length > b.length ? a : b));
    }
    formatSounds(sounds, soundLength, countLength) {
        const lines = sounds.map(sound => {
            const spacesForSound = ' '.repeat(soundLength - sound.name.length + 1);
            const spacesForCount = ' '.repeat(countLength - String(sound.count).length);
            return `${sound.name}:${spacesForSound}${spacesForCount}${sound.count}`;
        });
        return ['```', ...lines, '```'].join('\n');
    }
}
exports.MostPlayedCommand = MostPlayedCommand;
