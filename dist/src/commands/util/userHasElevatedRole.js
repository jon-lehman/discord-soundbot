"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Container_1 = require("../../util/Container");
const userHasElevatedRole = (member) => {
    if (!member)
        return false;
    if (member.hasPermission(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))
        return true;
    return member.roles.cache.some(role => Container_1.config.elevatedRoles.includes(role.name));
};
exports.default = userHasElevatedRole;
