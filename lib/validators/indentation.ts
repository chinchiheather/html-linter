import { IndentationConfig } from '../interfaces/config';

export class Indentation {

  static validate(filePath: string, lines: string[], config: IndentationConfig): string[] {
    const errors: string[] = [];
    const whitespaceRegex = config.char === 'space' ? /^ *$/ : /^\t*$/;

    let prevStartIdx = 0;
    lines.forEach((line: string, idx: number) => {
      let tagIdx = line.search(/^\s*</);
      if (tagIdx !== -1) {
        const startIdx = line.search(/\S/);
        const diff = Math.abs(prevStartIdx - startIdx);
        const whitespaceStr = line.substring(0, startIdx);
        if (diff !== config.number && diff !== 0 || !whitespaceRegex.test(whitespaceStr)) {
          errors.push(`ERROR: ${filePath}[${idx + 1}]: File should use ${config.number} ${config.char} indentation`);
        }
        prevStartIdx = startIdx;
      }
    });

    return errors;
  }
}
