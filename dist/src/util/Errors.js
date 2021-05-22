"use strict";
/* eslint-disable max-classes-per-file */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameError = exports.InvalidUrlError = exports.DuplicationError = exports.AttachmentSizeError = exports.AttachmentExtensionError = exports.ValidationError = exports.UnspecificError = exports.FormatError = void 0;
const localize_1 = __importDefault(require("./i18n/localize"));
class FormatError extends Error {
    constructor() {
        super(localize_1.default.t('errors.format.time'));
        this.name = 'FormatError';
    }
}
exports.FormatError = FormatError;
class UnspecificError extends Error {
    constructor() {
        super(localize_1.default.t('errors.unspecific'));
        this.name = 'UnspecificError';
    }
}
exports.UnspecificError = UnspecificError;
// Validation
class ValidationError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
class AttachmentExtensionError extends ValidationError {
    constructor(extensions) {
        super(localize_1.default.t('validation.attachment.extension', { extensions: extensions.join(', ') }));
    }
}
exports.AttachmentExtensionError = AttachmentExtensionError;
class AttachmentSizeError extends ValidationError {
    constructor() {
        super(localize_1.default.t('validation.attachment.size'));
    }
}
exports.AttachmentSizeError = AttachmentSizeError;
class DuplicationError extends ValidationError {
    constructor(sound) {
        super(localize_1.default.t('errors.sounds.exists', { sound }));
    }
}
exports.DuplicationError = DuplicationError;
class InvalidUrlError extends ValidationError {
    constructor() {
        super(localize_1.default.t('errors.format.url'));
    }
}
exports.InvalidUrlError = InvalidUrlError;
class NameError extends ValidationError {
    constructor() {
        super(localize_1.default.t('errors.format.sound'));
    }
}
exports.NameError = NameError;
