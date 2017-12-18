import { AttrWhitespace } from './attributes/attr-whitespace';
import { AttrQuotes } from './attributes/attr-quotes';
import { AttributesConfig } from '../interfaces/config';

export class Attributes {

  static validate(filePath: string, lines: string[], config: AttributesConfig): string[] {
    const errors: string[] = [];

    const attrRegex = /(\S+)(\s|[\w\)\]])=\s*["']+/g;
    let inScriptTag = false;
    let currentIdentation = -1;
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
              errors.push(`ERROR: ${filePath}[${idx + 1}]: Attributes should have ${config.whitespace} whitespace around '=' character`);
            }
            if (config.quotes && !AttrQuotes.validate(attrMatch, config.quotes)) {
              errors.push(`ERROR: ${filePath}[${idx + 1}]: Attributes should use ${config.quotes} quotes`);
            }
          });

          if (config['vertical-align']) {
            const firstAttrIdx = line.search(attrRegex);
            const substring = line.substring(0, firstAttrIdx);
            if (/<[a-zA-Z0-9-]+\s$/.test(substring)) {
              currentIdentation = firstAttrIdx;
            } else {
              if (currentIdentation !== firstAttrIdx) {
                errors.push(`ERROR: ${filePath}[${idx + 1}]: Attributes should vertically align`);
              }
            }
          }
        }
      }
    });

    return errors;
  }
}
