"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCommand = void 0;
const Command_1 = __importDefault(require("../base/Command"));
class AddCommand extends Command_1.default {
    constructor(attachmentDownloader, youtubeDownloader) {
        super();
        this.triggers = ['add'];
        this.attachmentDownloader = attachmentDownloader;
        this.youtubeDownloader = youtubeDownloader;
    }
    run(message, params) {
        if (!message.attachments.size) {
            this.youtubeDownloader.handle(message, params);
            return;
        }
        this.attachmentDownloader.handle(message);
    }
}
exports.AddCommand = AddCommand;
