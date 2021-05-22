"use strict";
/* eslint-disable max-classes-per-file */
Object.defineProperty(exports, "__esModule", { value: true });
const Errors_1 = require("../../../../util/Errors");
const SoundUtil_1 = require("../../../../util/SoundUtil");
class BaseValidator {
    validateName(name) {
        if (!name.match(/[^a-z0-9]/))
            return;
        throw new Errors_1.NameError();
    }
    validateUniqueness(name) {
        if (!SoundUtil_1.existsSound(name))
            return;
        throw new Errors_1.DuplicationError(name);
    }
}
exports.default = BaseValidator;
