export class Indentation {

  static errorMsg = 'File should use 2 space indentation';

  static validate(filePath: string, lines: string[]): string[] {
    const errors: string[] = [];
    // todo: configure character and num
    const indentation = 2;

    let prevStartIdx = 0;
    lines.forEach((line: string, idx: number) => {
      let startIdx = line.search(/</);
      if (startIdx !== -1) {
        const diff = Math.abs(prevStartIdx - startIdx);
        if (diff !== indentation && diff !== 0) {
          errors.push(`${filePath}:${idx + 1} ${Indentation.errorMsg}`);
        }
        prevStartIdx = startIdx;
      }
    });

    return errors;
  }
}
