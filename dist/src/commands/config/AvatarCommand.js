"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarCommand = void 0;
const localize_1 = __importDefault(require("../../util/i18n/localize"));
const ConfigCommand_1 = __importDefault(require("../base/ConfigCommand"));
class AvatarCommand extends ConfigCommand_1.default {
    constructor() {
        super(...arguments);
        this.triggers = ['avatar'];
        this.numberOfParameters = 1;
        this.usage = 'Usage: !avatar [remove]';
        this.elevated = true;
    }
    setClientUser(user) {
        this.user = user;
    }
    run(message, params) {
        if (params.length === this.numberOfParameters && params[0] === 'remove') {
            this.user.setAvatar('');
            return;
        }
        if (message.attachments.size === 0) {
            this.listAvatar(message);
            return;
        }
        if (message.attachments.size !== 1) {
            message.channel.send(this.usage);
            return;
        }
        this.user
            .setAvatar(message.attachments.first().url)
            .catch(() => message.channel.send(localize_1.default.t('commands.avatar.errors.tooFast')));
    }
    listAvatar(message) {
        if (!this.user.avatarURL()) {
            message.channel.send(localize_1.default.t('commands.avatar.errors.noAvatar', { prefix: this.config.prefix }));
            return;
        }
        message.channel.send(localize_1.default.t('commands.avatar.url', {
            url: this.user.displayAvatarURL({ dynamic: true, format: 'png', size: 256 })
        }));
    }
}
exports.AvatarCommand = AvatarCommand;
