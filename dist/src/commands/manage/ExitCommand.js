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
exports.ExitCommand = void 0;
const exits = __importStar(require("../../util/db/Exits"));
const SoundUtil_1 = require("../../util/SoundUtil");
const Command_1 = __importDefault(require("../base/Command"));
class ExitCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.triggers = ['exit'];
    }
    run(message, params) {
        const [exitSound] = params;
        if (!exitSound) {
            exits.remove(message.author.id);
            return;
        }
        const sounds = SoundUtil_1.getSounds();
        if (!sounds.includes(exitSound))
            return;
        exits.add(message.author.id, exitSound);
    }
}
exports.ExitCommand = ExitCommand;
