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
exports.RenameCommand = void 0;
const fs_1 = __importDefault(require("fs"));
const soundsDb = __importStar(require("../../util/db/Sounds"));
const localize_1 = __importDefault(require("../../util/i18n/localize"));
const SoundUtil_1 = require("../../util/SoundUtil");
const Command_1 = __importDefault(require("../base/Command"));
class RenameCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.triggers = ['rename'];
        this.numberOfParameters = 2;
        this.usage = 'Usage: !rename <old> <new>';
        this.elevated = true;
    }
    run(message, params) {
        if (!message.member)
            return;
        if (params.length !== this.numberOfParameters) {
            message.channel.send(this.usage);
            return;
        }
        const [oldName, newName] = params;
        const sounds = SoundUtil_1.getSounds();
        if (!sounds.includes(oldName)) {
            message.channel.send(localize_1.default.t('commands.rename.notFound', { oldName }));
            return;
        }
        if (sounds.includes(newName)) {
            message.channel.send(localize_1.default.t('errors.sounds.exists', { sound: newName }));
            return;
        }
        const extension = SoundUtil_1.getExtensionForSound(oldName);
        const oldFile = `sounds/${oldName}.${extension}`;
        const newFile = `sounds/${newName}.${extension}`;
        fs_1.default.renameSync(oldFile, newFile);
        soundsDb.rename(oldName, newName);
        message.channel.send(localize_1.default.t('commands.rename.success', { newName, oldName }));
    }
}
exports.RenameCommand = RenameCommand;
