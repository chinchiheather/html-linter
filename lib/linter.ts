import * as fs from 'fs';
import { Indentation } from './validators/indentation';
import { Attributes } from './validators/attributes';
import { HtmlLinterConfig } from './interfaces/config';
import * as glob from 'glob';

export class Linter {

  static lint(config: HtmlLinterConfig, fileList: string[]): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const errors: string[] = [];
      const filePaths = fileList || config.files;
      if (!Array.isArray(filePaths)) {
        reject('files must be an array of file paths to lint (glob patterns are allowed)');
      } else {
        if (filePaths.length === 0) {
          reject('No files to lint');
        } else {
          let lintedCount = 0;
          let targetCount = 0;
          filePaths.forEach(filePath => {
            glob(filePath, (error, files) => {
              if (error) {
                reject(error.toString());
              } else {
                targetCount += files.length;
                files.forEach(file => {
                  fs.readFile(file, (error, data) => {
                    if (error) {
                      reject(error.toString());
                    } else {
                      const fileString = data.toString();
                      const lines = fileString.split('\n');

                      if (config.indentation) {
                        errors.push(...Indentation.validate(file, lines, config.indentation));
                      }
                      if (config.attributes) {
                        errors.push(...Attributes.validate(file, lines, config.attributes));
                      }

                      if (++lintedCount === targetCount) {
                        resolve(errors);
                      }
                    }
                  });
                });
              }
            });
          });
        }
      }
    });
  }

}
