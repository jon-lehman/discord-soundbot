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
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const Errors_1 = require("../../../../util/Errors");
const localize_1 = __importDefault(require("../../../../util/i18n/localize"));
const BaseDownloader_1 = __importDefault(require("./BaseDownloader"));
class AttachmentDownloader extends BaseDownloader_1.default {
    constructor(attachmentValidator) {
        super();
        this.validator = attachmentValidator;
    }
    handle(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.addSounds(message);
            }
            catch (error) {
                this.handleError(message, error);
            }
        });
    }
    addSounds(message) {
        return __awaiter(this, void 0, void 0, function* () {
            // NOTE: .forEach swallows exceptions in an async setup, so use for..of
            for (const attachment of message.attachments.array()) {
                this.validator.validate(attachment);
                // NOTE: This could be optimized, but it is okay to do it in succession and code is cleaner
                // eslint-disable-next-line no-await-in-loop
                yield this.fetchAndSaveSound(attachment);
                // NOTE: Checked for attachment name during validation
                const name = attachment.name.split('.')[0];
                message.channel.send(localize_1.default.t('commands.add.success', { name }));
            }
        });
    }
    fetchAndSaveSound(attachment) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.downloadFile(attachment.url);
            this.saveResponseToFile(response, attachment.name.toLowerCase());
        });
    }
    downloadFile(url) {
        return new Promise((resolve, reject) => {
            https_1.default.get(url).on('response', resolve).on('error', reject);
        });
    }
    saveResponseToFile(response, filename) {
        if (response.statusCode !== 200)
            throw new Errors_1.UnspecificError();
        response.pipe(fs_1.default.createWriteStream(`./sounds/${filename}`));
    }
}
exports.default = AttachmentDownloader;
