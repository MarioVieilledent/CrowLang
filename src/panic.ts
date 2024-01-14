export const panic = (errorMessage: string, lineNumber: number) =>
  console.error(`Error at line ${lineNumber}: ${errorMessage}`);
