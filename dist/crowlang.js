"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const constants_1 = require("./constants");
const interpret_1 = require("./interpret");
const pjson = require("../package.json");
const command = process.argv[2];
if (command === constants_1.COMMAND_RUN) {
    fs.readFile(process.argv[3], "utf8", (err, script) => {
        if (err) {
            console.error(err);
        }
        else {
            (0, interpret_1.interpretFile)((0, interpret_1.shorten)(script));
        }
    });
}
else if (command === constants_1.COMMAND_HELP) {
    console.log(`CrowLang v${pjson.version}
  run <file.cl> - interpret cl script`);
}
else {
    console.log(`> ${command}: unknown command, type ${constants_1.CROW_LANG} ${constants_1.COMMAND_HELP} for help.`);
}
