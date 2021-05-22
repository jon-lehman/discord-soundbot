"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MODIFIER_OPTIONS = {
    clip: {
        parameters: { max: 2, min: 1 },
        usage: 'Usage: !modify <sound> clip 14 18?'
    },
    volume: {
        parameters: { max: 1, min: 1 },
        usage: 'Usage: !modify <sound> volume 1'
    }
};
exports.default = MODIFIER_OPTIONS;
