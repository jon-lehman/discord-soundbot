"use strict";
/* eslint-disable max-classes-per-file */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errors_1 = require("../../../../util/Errors");
const BaseValidator_1 = __importDefault(require("./BaseValidator"));
class AttachmentValidator extends BaseValidator_1.default {
    constructor(config) {
        super();
        this.config = config;
    }
    validate(attachment) {
        return this.validateAttachment(attachment);
    }
    validateAttachment(attachment) {
        if (!attachment.name)
            throw new Error('Attachment without name :confused:');
        const fileName = attachment.name.toLowerCase();
        const soundName = fileName.substring(0, fileName.lastIndexOf('.'));
        this.validateExtension(fileName);
        this.validateName(soundName);
        this.validateSize(attachment.size);
        this.validateUniqueness(soundName);
    }
    validateExtension(fileName) {
        if (this.config.acceptedExtensions.some(ext => fileName.endsWith(ext)))
            return;
        throw new Errors_1.AttachmentExtensionError(this.config.acceptedExtensions);
    }
    validateSize(filesize) {
        if (filesize <= this.config.maximumFileSize)
            return;
        throw new Errors_1.AttachmentSizeError();
    }
}
exports.default = AttachmentValidator;
