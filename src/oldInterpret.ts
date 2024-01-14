import { calc } from "./basicOperations";
import { STRING_TYPE } from "./constants";
import { evaluateValue } from "./typeChecker";
import { FunctionSet, ScriptFunc } from "./types";

const funcMatch =
  /([a-zA-Z].*?)\s?\=\s?\((.*?)\)(?:\:\s?(.+?)|\s?)\s?\=\>\s?(?:\{((?:(?:\r\n|\r|\n)|.)*?)\}|(.*?)\;)/gm;
const commentRegex = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;
const printFuncMatch = /print\((.*?)\)\;/;

const createFunctionSet = (script: string): FunctionSet => {
  let functionSet: FunctionSet = {};

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
      bodyScript: m[4] ?? m[5],
    };
  }

  return functionSet;
};

const removeComments: ScriptFunc = (script) => script.replace(commentRegex, "");

const removeEmptyLines: ScriptFunc = (script) =>
  script
    .split("\n")
    .filter((line) => line.trim() !== "")
    .join("\n");

const interpretScript = (script: string): void => {
  script.split("\n").forEach((line) => interpretLine(line));
};

const interpretLine = (script: string): void => {
  script = script.trim();
  let m;
  if (script) {
    if ((m = printFuncMatch.exec(script)) !== null) {
      const e = evaluateValue(m[1]);
      if (e.clType === STRING_TYPE) {
        console.log(e.value);
      }
    }
  }
};

export const shorten: ScriptFunc = (script) =>
  removeComments(removeEmptyLines(script));

export const interpretFile = (script: string): void => {
  let functionSet: FunctionSet = createFunctionSet(script);

  if (functionSet.main) {
    interpretScript(functionSet.main.bodyScript);
  }
};
