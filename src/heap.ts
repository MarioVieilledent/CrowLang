import { VOID_TYPE } from "./constants";
import { Function, FunctionCollection } from "./types";

class Heap {
  private memory: FunctionCollection;

  constructor() {
    this.memory = {};
  }

  public allocate(e: Function): void {
    this.memory[e.key] = e;
  }

  public get(key: string): Function {
    return this.memory[key] ?? VOID_TYPE;
  }

  public getHeap(): FunctionCollection {
    return this.memory;
  }

  public displayHeap(level = 0, func?: Function): void {
    if (func) {
      Object.entries(func.childFunctions).forEach(([key, value]) => {
        console.log(`${"   ".repeat(level)}- ${key}`);
        if (value.childFunctions) {
          this.displayHeap(1, value);
        }
      });
    } else {
      Object.entries(this.memory).forEach(([key, value]) => {
        console.log(`${"   ".repeat(level)}- ${key}`);
        if (value.childFunctions) {
          this.displayHeap(1, value);
        }
      });
    }
  }
}

export default Heap;
