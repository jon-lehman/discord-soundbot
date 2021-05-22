"use strict";
/* eslint-disable max-classes-per-file */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = __importDefault(require("url"));
const Errors_1 = require("../../../../util/Errors");
const BaseValidator_1 = __importDefault(require("./BaseValidator"));
class YoutubeValidator extends BaseValidator_1.default {
    constructor() {
        super(...arguments);
        this.VALID_HOSTS = ['www.youtube.com', 'youtu.be'];
    }
    validate(name, url) {
        this.validateName(name);
        this.validateUniqueness(name);
        this.validateUrl(url);
    }
    validateUrl(link) {
        const { hostname } = url_1.default.parse(link);
        if (hostname && this.VALID_HOSTS.includes(hostname))
            return;
        throw new Errors_1.InvalidUrlError();
    }
}
exports.default = YoutubeValidator;
