"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const i18n_1 = __importDefault(require("i18n"));
const path_1 = __importDefault(require("path"));
const localesPath = path_1.default.join(__dirname, '..', '..', '..', '..', 'config', 'locales');
const files = fs_1.default.readdirSync(localesPath);
i18n_1.default.configure({
    defaultLocale: 'en',
    directory: localesPath,
    locales: files.map(file => path_1.default.basename(file, '.json')),
    objectNotation: true,
    retryInDefaultLocale: true,
    updateFiles: false
});
const localize = {
    getLocale: i18n_1.default.getLocale,
    getLocales: i18n_1.default.getLocales,
    setLocale: i18n_1.default.setLocale,
    t: i18n_1.default.__mf,
    translate: i18n_1.default.__mf // eslint-disable-line no-underscore-dangle
};
exports.default = localize;
