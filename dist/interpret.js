"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const heap_1 = __importDefault(require("./heap"));
const commentRegex = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;
class CrowInterpreter {
    constructor(script) {
        this.removeComments = (script) => script.replace(commentRegex, "");
        this.removeEmptyLines = (script) => script
            .split("\n")
            .filter((line) => line.trim() !== "")
            .join("\n");
        this.heap = new heap_1.default();
        this.rawScript = script;
        this.shortScript = this.removeEmptyLines(this.removeComments(script));
    }
    interpret() {
        let level = 0;
        let comment = false;
        const lines = this.rawScript.split("\n");
        console.log(lines[27]);
    }
}
exports.default = CrowInterpreter;
