import { VOID_TYPE } from "./constants";
import { Expression, Variable } from "./types";

class Heap {
  memory: { [key: string]: Variable };

  constructor() {
    this.memory = {};
  }

  allocate(e: Variable): void {
    this.memory[e.key] = e;
  }

  get(key: string): Variable {
    return this.memory[key] ?? VOID_TYPE;
  }
}

export default Heap;
