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
exports.IgnoreCommand = void 0;
const ignoreList = __importStar(require("../../util/db/IgnoreList"));
const localize_1 = __importDefault(require("../../util/i18n/localize"));
const Command_1 = __importDefault(require("../base/Command"));
class IgnoreCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.triggers = ['ignore'];
        this.usage = 'Usage: !ignore <user>';
        this.elevated = true;
    }
    run(message) {
        const { users } = message.mentions;
        if (users.size < 1) {
            message.channel.send(this.usage);
            message.channel.send(localize_1.default.t('helpers.userFinder.error'));
            return;
        }
        users.forEach(user => {
            ignoreList.add(user.id);
            message.channel.send(localize_1.default.t('commands.ignore.add', { user: user.username }));
        });
    }
}
exports.IgnoreCommand = IgnoreCommand;
