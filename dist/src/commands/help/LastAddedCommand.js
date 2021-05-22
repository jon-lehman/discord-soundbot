"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LastAddedCommand = void 0;
const fs_1 = __importDefault(require("fs"));
const SoundUtil_1 = require("../../util/SoundUtil");
const Command_1 = __importDefault(require("../base/Command"));
class LastAddedCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.triggers = ['lastadded'];
        this.amount = 5;
    }
    run(message) {
        message.channel.send(['```', ...this.getLastAddedSounds(), '```'].join('\n'));
    }
    getLastAddedSounds() {
        return SoundUtil_1.getSoundsWithExtension()
            .map(sound => ({
            creation: fs_1.default.statSync(SoundUtil_1.getPathForSound(sound.name)).birthtime,
            name: sound.name
        }))
            .sort((a, b) => b.creation.valueOf() - a.creation.valueOf())
            .slice(0, this.amount)
            .map(sound => sound.name);
    }
}
exports.LastAddedCommand = LastAddedCommand;
