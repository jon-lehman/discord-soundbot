"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.add = exports.exists = exports.get = void 0;
const connection_1 = __importDefault(require("./connection"));
const table = 'exits';
const get = (userId) => connection_1.default.get(`${table}.${userId}`).value();
exports.get = get;
const exists = (userId) => !!exports.get(userId);
exports.exists = exists;
const add = (userId, sound) => {
    connection_1.default.set(`${table}.${userId}`, sound).write();
};
exports.add = add;
const remove = (userId) => {
    connection_1.default.unset(`${table}.${userId}`).write();
};
exports.remove = remove;
