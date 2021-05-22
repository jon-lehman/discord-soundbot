"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = __importDefault(require("./i18n"));
const getCurrentLocale = () => i18n_1.default.getLocale();
const getLocales = () => i18n_1.default.getLocales();
const setLocale = (locale) => {
    if (getLocales().includes(locale))
        i18n_1.default.setLocale(locale);
};
const translate = (id, replacements) => i18n_1.default.translate(id, replacements);
const t = translate;
const localize = {
    getCurrentLocale,
    getLocales,
    setLocale,
    t,
    translate
};
exports.default = localize;
