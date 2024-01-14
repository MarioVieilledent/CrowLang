import Heap from "./heap";

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
    let level = 0;
    let comment = false;
    let currentLine = 0;
    const maxLine = this.rawScript.length;

    const lines = this.rawScript.split("\n");

    while (currentLine < maxLine) {
      const line = lines[currentLine].trim();
    }
  }

  private removeComments = (script: string): string =>
    script.replace(commentRegex, "");

  private removeEmptyLines = (script: string): string =>
    script
      .split("\n")
      .filter((line) => line.trim() !== "")
      .join("\n");
}

export default CrowInterpreter;
