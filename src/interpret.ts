import Heap from "./heap";
import { panic } from "./panic";
import { CLType } from "./types";

const commentRegex = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;

class CrowInterpreter {
  private heap: Heap;
  private rawScript: string;
  private shortScript: string;

  constructor(script: string) {
    this.heap = new Heap();
    this.rawScript = script;
    this.shortScript = this.removeEmptyLines(this.removeComments(script));
  }

  public interpret(): void {
    let m; // Match value for regex tests
    let level = 0; // Level of nested function, 0 is we are in the file
    let comment = false; // If we are in a comment
    let currentLine = -1; // Current line we're interpreting (starts at 0)
    let currentFunction = []; // Current function we're working in

    const lines = this.rawScript.split("\n");
    const len = lines.length;

    while (currentLine < len - 1) {
      currentLine++;
      // trim and replace many spaces by one space
      const line = lines[currentLine].trim().replace(/\s\s+/g, " ");
      let tokens = line.split(" ");
      const tl = tokens.length;

      // Empty line

      if (tl === 1 && tokens[0] === "") {
        continue;
      }

      // Comments

      if (tokens.includes("*/")) {
        comment = false;
        continue;
        // DEBUG, here I ignore the rest of the line after we encounter */
      }
      if (comment) {
        continue;
      }
      if (tl >= 1 && tokens[0] === "//") {
        continue;
      }
      if (tl >= 1 && tokens[0] === "/*") {
        comment = true;
        continue;
      }

      // Function definitions

      // def = (param: s): v => {
      // def = (): v => {
      // def = () => {
      // def = => {
      m = line.match(
        /^([a-zA-Z][a-zA-Z0-9]*?)\s?\=\s?((?:\(.*?\)|))(?:\:\s?(.*?)|)\s?\=\>\s?\{/
      );
      if (m) {
        const func = this.createFunction(m[1], m[2], "", m[3]);
        if (level === 0) {
          this.heap.allocate(func);
          currentFunction.push(m[1]);
        } else if (level === 1) {
          this.heap.get(currentFunction[0]).childFunctions[m[1]] = func;
          currentFunction.push(m[1]);
        } else {
          panic("triple nested function not allowed", currentLine);
        }
        level++;
        continue;
      }

      // def = (param: s): v => void;
      // def = (): v => void;
      // def = () => void;
      // def = void;
      m = line.match(
        /^([a-zA-Z][a-zA-Z0-9]*?)\s?\=\s?(?:(?:\((.*?)\)|)(?:\:\s?(.*?)|)\s?\=\>|)\s?(.*?)\;/
      );
      if (m) {
        const func = this.createFunction(m[1], m[2], m[3], m[4]);
        if (level === 0) {
          this.heap.allocate(func);
        } else if (level === 1) {
          this.heap.get(currentFunction[0]).childFunctions[m[1]] = func;
        } else {
          panic("triple nested function not allowed", currentLine);
        }
        continue;
      }

      // }
      if (tl >= 1 && tokens[0] === "}") {
        if (level <= 0) {
          panic("} doesn't close any function", currentLine);
        } else {
          level--;
          currentFunction.splice(-1);
        }
        continue;
      }

      console.log(line);
    }

    console.log(this.heap.displayHeap());
  }

  private createFunction: Function = (
    keyStr: string,
    parametersStr: string,
    clTypeStr: string,
    valueStr: string
  ) => ({
    key: keyStr,
    parameters: parametersStr
      ? parametersStr.trim().replace("(", "").replace(")", "").split(",")
      : [],
    clType: clTypeStr as CLType,
    value: valueStr,
    childFunctions: [],
  });

  private removeComments = (script: string): string =>
    script.replace(commentRegex, "");

  private removeEmptyLines = (script: string): string =>
    script
      .split("\n")
      .filter((line) => line.trim() !== "")
      .join("\n");
}

export default CrowInterpreter;
