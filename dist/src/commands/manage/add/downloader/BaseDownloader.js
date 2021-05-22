"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errors_1 = require("../../../../util/Errors");
const localize_1 = __importDefault(require("../../../../util/i18n/localize"));
const HANDLED_ERRORS = [Errors_1.FormatError.name, Errors_1.ValidationError.name];
class BaseDownloader {
    handleError(message, error) {
        if (HANDLED_ERRORS.includes(error.name)) {
            message.channel.send(error.message);
            return;
        }
        console.error(error);
        message.channel.send(localize_1.default.t('errors.unspecific'));
    }
}
exports.default = BaseDownloader;
