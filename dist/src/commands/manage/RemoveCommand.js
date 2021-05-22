"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveCommand = void 0;
const fs_1 = __importDefault(require("fs"));
const sounds = __importStar(require("../../util/db/Sounds"));
const localize_1 = __importDefault(require("../../util/i18n/localize"));
const SoundUtil_1 = require("../../util/SoundUtil");
const Command_1 = __importDefault(require("../base/Command"));
class RemoveCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.triggers = ['remove'];
        this.numberOfParameters = 1;
        this.usage = 'Usage: !remove <sound>';
        this.elevated = true;
    }
    run(message, params) {
        if (params.length !== this.numberOfParameters) {
            message.channel.send(this.usage);
            return;
        }
        const sound = params.shift();
        if (!SoundUtil_1.existsSound(sound)) {
            message.channel.send(localize_1.default.t('commands.remove.notFound', { sound }));
            return;
        }
        const file = SoundUtil_1.getPathForSound(sound);
        fs_1.default.unlinkSync(file);
        sounds.remove(sound);
        message.channel.send(localize_1.default.t('commands.remove.success', { sound }));
    }
}
exports.RemoveCommand = RemoveCommand;
