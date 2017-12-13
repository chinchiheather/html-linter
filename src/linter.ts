import * as fs from 'fs';
import { Indentation } from './validators/indentation';
import { AttrQuotes } from './validators/attributes/attr-quotes';
import { AttrWhitespace } from './validators/attributes/attr-whitespace';
import { Attributes } from './validators/attributes';

export class Linter {

  static lint(filePaths: string[]): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const errors: string[] = [];
      let lintedCount = 0;

      filePaths.forEach(filePath => {
        fs.readFile(filePath, (error, data) => {
          if (error) {
            reject(error.toString());
          } else {
            const fileString = data.toString();
            const lines = fileString.split('\n');

            // todo: centralise the way error messages set the file & line no
            errors.push(...Indentation.validate(filePath, lines));
            errors.push(...Attributes.validate(filePath, lines));

            if (++lintedCount === filePaths.length) {
              resolve(errors);
            }
          }
        });
      });
    });
  }

}
