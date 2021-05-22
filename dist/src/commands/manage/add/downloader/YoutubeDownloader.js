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
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const getSecondsFromTime_1 = __importDefault(require("../../../../util/getSecondsFromTime"));
const localize_1 = __importDefault(require("../../../../util/i18n/localize"));
const BaseDownloader_1 = __importDefault(require("./BaseDownloader"));
const unlink = util_1.default.promisify(fs_1.default.unlink);
class YoutubeDownloader extends BaseDownloader_1.default {
    constructor(youtubeValidator) {
        super();
        this.validator = youtubeValidator;
    }
    handle(message, params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (params.length < 2 || params.length > 4)
                return;
            const [soundName, url, start, end] = params;
            try {
                this.validator.validate(soundName, url);
                yield this.addSound({ end, soundName, start, url });
                message.channel.send(localize_1.default.t('commands.add.success', { name: soundName }));
            }
            catch (error) {
                this.handleError(message, error);
            }
        });
    }
    addSound({ url, start, end, soundName }) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = getSecondsFromTime_1.default(start);
            const endTime = getSecondsFromTime_1.default(end);
            yield this.download(url);
            yield this.convert({ endTime, soundName, startTime });
            yield this.cleanUp();
        });
    }
    download(url) {
        return new Promise((resolve, reject) => {
            ytdl_core_1.default(url, { filter: format => format.container === 'mp4' })
                .pipe(fs_1.default.createWriteStream('tmp.mp4'))
                .on('finish', resolve)
                .on('error', reject);
        });
    }
    convert({ soundName, startTime, endTime }) {
        let ffmpegCommand = fluent_ffmpeg_1.default('tmp.mp4').output(`./sounds/${soundName}.mp3`);
        if (startTime)
            ffmpegCommand = ffmpegCommand.setStartTime(startTime);
        if (startTime && endTime)
            ffmpegCommand = ffmpegCommand.setDuration(endTime - startTime);
        return new Promise((resolve, reject) => ffmpegCommand.on('end', resolve).on('error', reject).run());
    }
    cleanUp() {
        return unlink('tmp.mp4');
    }
}
exports.default = YoutubeDownloader;
