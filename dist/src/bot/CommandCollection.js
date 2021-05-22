"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommandCollection {
    constructor(commands) {
        this.triggers = new Map();
        this.commands = [];
        this.soundCommand = commands.find(command => !command.triggers.length);
        this.registerCommands(commands);
    }
    registerCommands(commands) {
        this.commands.push(...commands);
        commands.forEach(command => this.registerTriggers(command));
    }
    registerUserCommands(user) {
        // NOTE: Filter for user commands and set their user
        // @ts-ignore
        const userCommands = this.commands.filter(command => !!command.setClientUser);
        userCommands.forEach(command => command.setClientUser(user));
    }
    get(command) {
        return this.triggers.get(command) || this.soundCommand;
    }
    registerTriggers(command) {
        command.triggers.forEach(trigger => this.triggers.set(trigger, command));
    }
}
exports.default = CommandCollection;
