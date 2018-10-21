import * as fs from 'fs';
import { Indentation } from './validators/indentation';
import { Attributes } from './validators/attributes';
import { HtmlLinterConfig } from './interfaces/config';
import * as glob from 'glob';
import { Validation } from 'interfaces/validation';
import Logger from './utils/logger';
import chalk from 'chalk';

export class Linter {
  static lint(config: HtmlLinterConfig, fileList: string[]): Promise<number> {
    return new Promise((resolve, reject) => {
      const errors: string[] = [];
      const filePaths = fileList || config.files;
      if (!Array.isArray(filePaths)) {
        reject('files must be an array of file paths to lint (glob patterns are allowed)');
      } else {
        if (filePaths.length === 0) {
          reject('No files to lint');
        } else {
          const promises = [];
          filePaths.forEach(filePath => {
            promises.push(this.checkFile(filePath, config));
          });
          Promise.all(promises).then((results) => {
            const numErrors = results.reduce((prev, curr) => prev + (curr && curr.length || 0), 0);
            if (numErrors === 0) {
              Logger.log(chalk.green('All files pass linting'));
            }
            resolve(numErrors);
          });
        }
      }
    });
  }

  private static checkFile(filePath: string, config: HtmlLinterConfig) {
    return new Promise((resolve) => {
      glob(filePath, (error: Error, files: string[]) => {
        if (error) {
          Logger.logResults(filePath, [{
            line: 0,
            column: 0,
            message: error.toString()
          }]);
        } else {
          let filesRead = 0;
          files.forEach(file => {
            fs.readFile(file, (error, data) => {
              const errors: Validation[] = [];
              if (error) {
                Logger.logResults(file, [{
                  line: 0,
                  column: 0,
                  message: error.toString()
                }]);
              } else {
                const fileString = data.toString();
                const lines = fileString.split('\n');

                if (config.indentation) {
                  errors.push(...Indentation.validate(lines, config.indentation));
                }
                if (config.attributes) {
                  errors.push(...Attributes.validate(lines, config.attributes));
                }

                if (errors.length > 0) {
                  Logger.logResults(file, errors);
                }
              }

              if (++filesRead === files.length) {
                resolve(errors);
              }
            });
          });
        }
      });
    });
  }
}
