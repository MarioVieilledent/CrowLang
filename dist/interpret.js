"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpretFile = exports.shorten = void 0;
const constants_1 = require("./constants");
const typeChecker_1 = require("./typeChecker");
const funcMatch = /([a-zA-Z].*?)\s?\=\s?\((.*?)\)(?:\:\s?(.+?)|\s?)\s?\=\>\s?(?:\{((?:(?:\r\n|\r|\n)|.)*?)\}|(.*?)\;)/gm;
const commentRegex = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;
const printFuncMatch = /print\((.*?)\)\;/;
const createFunctionSet = (script) => {
    var _a;
    let functionSet = {};
    let m;
    while ((m = funcMatch.exec(script)) !== null) {
        if (m.index === funcMatch.lastIndex) {
            funcMatch.lastIndex++;
        }
        functionSet[m[1]] = {
            script: m[0],
            name: m[1],
            parameters: m[2],
            returnType: m[3],
            bodyScript: (_a = m[4]) !== null && _a !== void 0 ? _a : m[5],
        };
    }
    return functionSet;
};
const removeComments = (script) => script.replace(commentRegex, "");
const removeEmptyLines = (script) => script
    .split("\n")
    .filter((line) => line.trim() !== "")
    .join("\n");
const interpretScript = (script) => {
    script.split("\n").forEach((line) => interpretLine(line));
};
const interpretLine = (script) => {
    script = script.trim();
    let m;
    if (script) {
        if ((m = printFuncMatch.exec(script)) !== null) {
            const e = (0, typeChecker_1.evaluateValue)(m[1]);
            if (e.clType === constants_1.STRING_TYPE) {
                console.log(e.value);
            }
        }
    }
};
const shorten = (script) => removeComments(removeEmptyLines(script));
exports.shorten = shorten;
const interpretFile = (script) => {
    let functionSet = createFunctionSet(script);
    if (functionSet.main) {
        interpretScript(functionSet.main.bodyScript);
    }
};
exports.interpretFile = interpretFile;
