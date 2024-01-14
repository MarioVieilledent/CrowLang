import * as fs from "fs";
import { COMMAND_HELP, COMMAND_RUN, CROW_LANG } from "./constants";
import CrowInterpreter from "./interpret";
const pjson = require("../package.json");

const command = process.argv[2];

if (command === COMMAND_RUN) {
  fs.readFile(
    process.argv[3],
    "utf8",
    (err: NodeJS.ErrnoException | null, script: string) => {
      if (err) {
        console.error(err);
      } else {
        const interpreter = new CrowInterpreter(script);
        interpreter.interpret();
      }
    }
  );
} else if (command === COMMAND_HELP) {
  console.log(`CrowLang v${pjson.version}
  run <file.cl> - interpret cl script`);
} else {
  console.log(
    `> ${command}: unknown command, type ${CROW_LANG} ${COMMAND_HELP} for help.`
  );
}
