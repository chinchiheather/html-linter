import * as fs from 'fs';
import { Indentation } from './validators/indentation';
import { Attributes } from './validators/attributes';
import { HtmlLinterConfig } from './interfaces/config';

export class Linter {

  static lint(config: HtmlLinterConfig): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const errors: string[] = [];
      const filePaths = config.files;
      let lintedCount = 0;

      if (filePaths.length === 0) {
        reject('No files to lint');
      } else {
        filePaths.forEach(filePath => {
          fs.readFile(filePath, (error, data) => {
            if (error) {
              reject(error.toString());
            } else {
              const fileString = data.toString();
              const lines = fileString.split('\n');

              errors.push(...Indentation.validate(filePath, lines));
              errors.push(...Attributes.validate(filePath, lines));

              if (++lintedCount === filePaths.length) {
                resolve(errors);
              }
            }
          });
        });
      }
    });
  }

}
