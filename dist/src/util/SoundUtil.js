"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.existsSound = exports.getPathForSound = exports.getExtensionForSound = exports.getSounds = exports.getSoundsWithExtension = void 0;
const fs_1 = __importDefault(require("fs"));
const Container_1 = require("./Container");
const getSoundsFromSoundFolder = () => {
    const files = fs_1.default.readdirSync('sounds/');
    return files.filter(sound => Container_1.config.acceptedExtensions.some(extension => sound.endsWith(extension)));
};
const getSoundWithExtension = (sound) => {
    const [name, extension] = sound.split('.');
    return { extension, name };
};
const getSoundsWithExtension = () => getSoundsFromSoundFolder().map(getSoundWithExtension);
exports.getSoundsWithExtension = getSoundsWithExtension;
const getSounds = () => exports.getSoundsWithExtension().map(sound => sound.name);
exports.getSounds = getSounds;
const getExtensionForSound = (name) => exports.getSoundsWithExtension().find(sound => sound.name === name).extension;
exports.getExtensionForSound = getExtensionForSound;
const getPathForSound = (sound) => `sounds/${sound}.${exports.getExtensionForSound(sound)}`;
exports.getPathForSound = getPathForSound;
const existsSound = (name) => exports.getSounds().includes(name);
exports.existsSound = existsSound;
