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
      const filePaths = fileList || config.files;
      if (!Array.isArray(filePaths) || filePaths.length === 0) {
        Logger.logHelp(
          'files must be an array in config file, or a comma-separated list on command line'
        );
        resolve(1);
      } else {
        const promises = [];
        filePaths.forEach(filePath => {
          promises.push(this.checkFile(filePath, config));
        });
        Promise.all(promises).then(results => {
          const totalLintErrors = results.reduce(
            (prev, curr) => prev + curr,
            0
          );
          if (totalLintErrors === 0) {
            Logger.log(chalk.green('All files pass linting'));
          }
          resolve(totalLintErrors);
        });
      }
    });
  }

  private static checkFile(filePath: string, config: HtmlLinterConfig) {
    return new Promise(resolve => {
      glob(filePath, (globError: Error, files: string[]) => {
        if (globError) {
          Logger.logResults(filePath, [
            {
              line: 0,
              column: 0,
              message: globError.toString()
            }
          ]);
        } else {
          let filesRead = 0;
          let lintErrors = 0;
          files.forEach(file => {
            fs.readFile(file, (fileError, data) => {
              if (fileError) {
                Logger.logResults(file, [
                  {
                    line: 0,
                    column: 0,
                    message: fileError.toString()
                  }
                ]);
              } else {
                const errors: Validation[] = [];
                const fileString = data.toString();
                const lines = fileString.split('\n');

                if (config.indentation) {
                  errors.push(
                    ...Indentation.validate(lines, config.indentation)
                  );
                }
                if (config.attributes) {
                  errors.push(...Attributes.validate(lines, config.attributes));
                }

                if (errors.length > 0) {
                  lintErrors += errors.length;
                  Logger.logResults(file, errors);
                }
              }

              if (++filesRead === files.length) {
                resolve(lintErrors);
              }
            });
          });
        }
      });
    });
  }
}
