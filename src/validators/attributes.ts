import { AttrWhitespace } from './attributes/attr-whitespace';
import { AttrQuotes } from './attributes/attr-quotes';
import { AttributesConfig } from '../interfaces/config';
import { AttrVerticalAlign } from './attributes/attr-vertical-align';
import { Validation } from 'interfaces/validation';

export class Attributes {
  static validate(lines: string[], config: AttributesConfig): Validation[] {
    const errors: Validation[] = [];

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
              errors.push({
                line: idx,
                column: 0, // todo: find column
                message: `Attributes should have ${config.whitespace} whitespace around '=' character`
              });
            }
            if (config.quotes && !AttrQuotes.validate(attrMatch, config.quotes)) {
              errors.push({
                line: idx,
                column: 0, // todo: find column
                message: `Attributes should use ${config.quotes} quotes`
              });
            }
          });
        }

        if (config['vertical-align']) {
          if (AttrVerticalAlign.getIndentation(line)) {
            currentIdentation = AttrVerticalAlign.getIndentation(line);
          } else if (currentIdentation !== -1) {
            if (currentIdentation !== line.search(/\S/)) {
              errors.push({
                line: idx,
                column: currentIdentation,
                message: 'Attributes should vertically align'
              });
            }
            if (line.indexOf(`>`) !== -1) {
              currentIdentation = -1;
            }
          }
        }
      }
    });

    return errors;
  }
}
