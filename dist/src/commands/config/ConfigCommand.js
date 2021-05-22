"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigCommand = void 0;
const localize_1 = __importDefault(require("../../util/i18n/localize"));
const ConfigCommand_1 = __importDefault(require("../base/ConfigCommand"));
class ConfigCommand extends ConfigCommand_1.default {
    constructor() {
        super(...arguments);
        this.triggers = ['config', 'set'];
        this.numberOfParameters = 2;
        this.usage = 'Usage: !config <option> <value>';
        this.elevated = true;
    }
    setClientUser(user) {
        this.user = user;
    }
    run(message, params) {
        if (params.length < this.numberOfParameters) {
            message.channel.send(this.usage);
            return;
        }
        const [field, ...value] = params;
        if (!this.config.has(field)) {
            message.channel.send(localize_1.default.t('commands.config.notFound', { field }));
            return;
        }
        const configValue = this.config.set(field, value);
        this.postProcess(field);
        message.channel.send(localize_1.default.t('commands.config.success', { field, value: configValue.toString() }));
    }
    postProcess(field) {
        switch (field) {
            case 'game':
                this.user.setActivity(this.config.game);
                break;
            case 'language':
                localize_1.default.setLocale(this.config.language);
                break;
            default:
                break;
        }
    }
}
exports.ConfigCommand = ConfigCommand;
