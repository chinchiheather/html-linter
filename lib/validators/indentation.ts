import { IndentationConfig } from '../interfaces/config';

export class Indentation {

  static validate(filePath: string, lines: string[], config: IndentationConfig): string[] {
    const errors: string[] = [];
    const whitespaceRegex = config.char === 'space' ? /^ *$/ : /^\t*$/;

    let prevStartIdx = 0;
    lines.forEach((line: string, idx: number) => {
      let startIdx = line.search(/</);
      if (startIdx !== -1) {
        const diff = Math.abs(prevStartIdx - startIdx);
        const whitespaceStr = line.substring(0, startIdx);
        if (diff !== config.number && diff !== 0 || !whitespaceRegex.test(whitespaceStr)) {
          errors.push(`${filePath}:${idx + 1} File should use ${config.number} ${config.char} indentation`);
        }
        prevStartIdx = startIdx;
      }
    });

    return errors;
  }
}
