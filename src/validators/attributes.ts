import { AttrWhitespace } from './attributes/attr-whitespace';
import { AttrQuotes } from './attributes/attr-quotes';

export class Attributes {

  static validate(filePath: string, lines: string[]): string[] {
    const errors: string[] = [];

    const attrRegex = /(\S+)\s?=\s?["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g;
    lines.forEach((line: string, idx: number) => {
      const attrMatches = line.match(attrRegex);
      if (attrMatches) {
        attrMatches.forEach(attrMatch => {
          if (!AttrWhitespace.validate(attrMatch)) {
            errors.push(`${filePath}:${idx + 1} ${AttrWhitespace.errorMsg}`);
          }
          if (!AttrQuotes.validate(attrMatch)) {
            errors.push(`${filePath}:${idx + 1} ${AttrQuotes.errorMsg}`);
          }
        });
      }
    });

    return errors;
  }
}
