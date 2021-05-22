"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.add = exports.exists = void 0;
const connection_1 = __importDefault(require("./connection"));
const exists = (id) => !!connection_1.default
    .get('ignoreList')
    .find(v => v === id)
    .value();
exports.exists = exists;
const add = (id) => {
    if (exports.exists(id))
        return;
    connection_1.default.get('ignoreList').push(id).write();
};
exports.add = add;
const remove = (id) => {
    connection_1.default
        .get('ignoreList')
        .remove(v => v === id)
        .write();
};
exports.remove = remove;
