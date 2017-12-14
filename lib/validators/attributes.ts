import { AttrWhitespace } from './attributes/attr-whitespace';
import { AttrQuotes } from './attributes/attr-quotes';
import { AttributesConfig } from '../interfaces/config';

export class Attributes {

  static validate(filePath: string, lines: string[], config: AttributesConfig): string[] {
    const errors: string[] = [];

    const attrRegex = /(\S+)\s*[^(!=)]=\s*["']+((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g;
    let inScriptTag = false;
    lines.forEach((line: string, idx: number) => {
      // don't want to check contents of script tags
      if (inScriptTag) {
        if (line.indexOf('</script') !== -1) {
          inScriptTag = false;
        }
      } else if (line.indexOf('<script') !== -1) {
        inScriptTag = true;
      } else {
        const attrMatches = line.match(attrRegex);
        if (attrMatches) {
          attrMatches.forEach(attrMatch => {
            if (config.whitespace != null && !AttrWhitespace.validate(attrMatch, config.whitespace)) {
              errors.push(`${filePath}:${idx + 1} Attributes should have ${config.whitespace} whitespace around '=' character`);
            }
            if (config.quotes && !AttrQuotes.validate(attrMatch, config.quotes)) {
              errors.push(`${filePath}:${idx + 1} Attributes should use ${config.quotes} quotes`);
            }
          });
        }
      }
    });

    return errors;
  }
}
