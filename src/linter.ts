import * as fs from 'fs';
import { Indentation } from './validators/indentation';
import { AttrQuotes } from './validators/attr-quotes';
import { AttrWhitespace } from './validators/attr-whitespace';

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
            errors.push(...AttrQuotes.validate(filePath, lines));
            errors.push(...AttrWhitespace.validate(filePath, lines));

            if (++lintedCount === filePaths.length) {
              resolve(errors);
            }
          }
        });
      });
    });
  }

}
