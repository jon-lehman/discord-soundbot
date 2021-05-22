"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyCommand = void 0;
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const Errors_1 = require("../../util/Errors");
const getSecondsFromTime_1 = __importDefault(require("../../util/getSecondsFromTime"));
const localize_1 = __importDefault(require("../../util/i18n/localize"));
const SoundUtil_1 = require("../../util/SoundUtil");
const Command_1 = __importDefault(require("../base/Command"));
const ModifierOptions_1 = __importDefault(require("./modify/ModifierOptions"));
const rename = util_1.default.promisify(fs_1.default.rename);
class ModifyCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.triggers = ['modify', 'change'];
    }
    run(message, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const [sound, modifier, ...commandParams] = params;
            if (!SoundUtil_1.existsSound(sound))
                return;
            const options = ModifierOptions_1.default[modifier];
            if (!options) {
                message.channel.send(localize_1.default.t('commands.modify.notFound', { modifier }));
                return;
            }
            if (commandParams.length < options.parameters.min ||
                commandParams.length > options.parameters.max) {
                message.channel.send(options.usage);
                return;
            }
            const fileInfo = this.getFileNameFor(sound);
            try {
                yield this.performModification(fileInfo, modifier, commandParams);
                yield this.replace(fileInfo);
                message.channel.send(localize_1.default.t('commands.modify.success', { modifier, sound }));
            }
            catch (error) {
                this.handleError(message, error, { modifier, sound });
            }
        });
    }
    // NOTE: We checked for param already before so we can ignore any related errors
    performModification(file, modifier, params) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (modifier) {
                case 'clip':
                    return this.clipSound(file, ...params);
                case 'volume':
                    return this.modifyVolume(file, ...params);
                default:
                    return Promise.reject();
            }
        });
    }
    modifyVolume({ currentFile, tempFile }, ...params) {
        const [value] = params;
        const ffmpegCommand = fluent_ffmpeg_1.default(currentFile)
            .audioFilters([{ filter: 'volume', options: value }])
            .output(tempFile);
        return new Promise((resolve, reject) => ffmpegCommand.on('end', resolve).on('error', reject).run());
    }
    clipSound({ currentFile, tempFile }, ...params) {
        const [startTime, endTime] = params;
        // NOTE: We checked params already, so start is definitely here
        const start = getSecondsFromTime_1.default(startTime);
        const end = getSecondsFromTime_1.default(endTime);
        let ffmpegCommand = fluent_ffmpeg_1.default(currentFile).output(tempFile).setStartTime(start);
        if (end)
            ffmpegCommand = ffmpegCommand.setDuration(end - start);
        return new Promise((resolve, reject) => ffmpegCommand.on('end', resolve).on('error', reject).run());
    }
    replace({ currentFile, tempFile }) {
        return rename(tempFile, currentFile);
    }
    getFileNameFor(sound) {
        const extension = SoundUtil_1.getExtensionForSound(sound);
        const currentFile = `./sounds/${sound}.${extension}`;
        const timestamp = Date.now();
        const tempFile = `./sounds/${sound}-${timestamp}.${extension}`;
        return { currentFile, tempFile };
    }
    handleError(message, error, { modifier, sound }) {
        if (error instanceof Errors_1.FormatError) {
            message.channel.send(error.message);
            return;
        }
        message.channel.send(localize_1.default.t('commands.modify.error', { modifier, sound }));
    }
}
exports.ModifyCommand = ModifyCommand;
