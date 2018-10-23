import { IndentationConfig } from '../interfaces/config';
import { Validation } from 'interfaces/validation';

/**
 * Validates the indentaion rule
 * Checks indentation character and number
 */
export class Indentation {
  static validate(lines: string[], config: IndentationConfig): Validation[] {
    const errors: Validation[] = [];
    const whitespaceRegex = config.char === 'space' ? /^ *$/ : /^\t*$/;

    let prevStartIdx = 0;
    lines.forEach((line: string, idx: number) => {
      const tagIdx = line.search(/^\s*</);
      if (tagIdx !== -1) {
        const startIdx = line.search(/\S/);
        const diff = Math.abs(prevStartIdx - startIdx);
        const whitespaceStr = line.substring(0, startIdx);
        if (
          (diff !== config.number && diff !== 0) ||
          !whitespaceRegex.test(whitespaceStr)
        ) {
          errors.push({
            line: idx,
            column: startIdx,
            message: `File should use ${config.number} ${
              config.char
            } indentation`
          });
        }
        prevStartIdx = startIdx;
      }
    });

    return errors;
  }
}
