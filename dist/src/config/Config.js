"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const camelCase_1 = __importDefault(require("lodash/camelCase"));
const path_1 = __importDefault(require("path"));
const DefaultConfig_1 = __importDefault(require("./DefaultConfig"));
class Config {
    constructor() {
        this.CONFIG_PATH = path_1.default.join(process.cwd(), 'config', 'config.json');
        this.MODIFIABLE_FIELDS = [
            'language',
            'prefix',
            'acceptedExtensions',
            'maximumFileSize',
            'volume',
            'deleteMessages',
            'stayInChannel',
            'timeout',
            'deafen',
            'game',
            'elevatedRoles'
        ];
        this.JSON_KEYS = ['clientId', 'token', ...this.MODIFIABLE_FIELDS];
        this.ARRAY_VALUES = ['acceptedExtensions', 'elevatedRoles'];
        this.initialize();
    }
    has(field) {
        return this.MODIFIABLE_FIELDS.includes(field);
    }
    set(field, value) {
        if (!this.JSON_KEYS.includes(field))
            return undefined;
        let newValue;
        switch (typeof this[field]) {
            case 'string':
                newValue = field === 'game' ? value.join(' ') : value[0];
                break;
            case 'number':
                newValue = parseFloat(value[0]);
                break;
            case 'boolean':
                newValue = value[0].toLowerCase() === 'true';
                break;
            case 'object':
            default:
                newValue = value;
                break;
        }
        this[field] = newValue;
        this.writeToConfig();
        return newValue;
    }
    setFrom(data) {
        Object.keys(data).forEach(field => {
            this[field] = data[field];
        });
    }
    initialize() {
        this.initializeDefaultConfig();
        if (fs_1.default.existsSync(this.CONFIG_PATH)) {
            this.initializeWithSavedConfig();
        }
        this.initializeFromEnvironmentVariables();
    }
    initializeDefaultConfig() {
        this.setFrom(DefaultConfig_1.default);
    }
    initializeWithSavedConfig() {
        // eslint-disable-next-line
        const savedConfig = require(this.CONFIG_PATH);
        this.setFrom(savedConfig);
    }
    initializeFromEnvironmentVariables() {
        Object.keys(process.env)
            .filter(envKey => this.JSON_KEYS.includes(camelCase_1.default(envKey)))
            .forEach(envKey => {
            let envValue = [process.env[envKey]];
            const configKey = camelCase_1.default(envKey);
            if (this.ARRAY_VALUES.includes(configKey)) {
                envValue = envValue[0].split(',');
            }
            this.set(configKey, envValue);
        });
    }
    writeToConfig() {
        fs_1.default.writeFile(this.CONFIG_PATH, JSON.stringify(this, this.JSON_KEYS, 2), error => {
            if (error)
                console.error(error);
        });
    }
}
exports.default = Config;
