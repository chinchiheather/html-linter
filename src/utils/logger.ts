import * as path from 'path';
import chalk from 'chalk';
import { Validation } from 'interfaces/validation';

export default class Logger {
  static log(message: string) {
    console.log(message);
  }

  /**
   * Logs the linting errors to the console
   */
  static logResults(filePath: string, validationErrors: Validation[]) {
    this.log(chalk.bold.red(`\nERROR in ${path.resolve(filePath)}`));

    const relativePath = path.relative(process.cwd(), filePath);
    this.log(chalk.bold.red(`\n${relativePath}`));

    // find the messages with the longest strings for fields so we can nicely align them
    const findLargestReducer = (prev, curr) => {
      return curr > prev ? curr : prev;
    };
    const longestLineChars = validationErrors
      .map(validation => `${validation.line}:${validation.column}`.length)
      .reduce(findLargestReducer, 0);
    const longestMsgChars = validationErrors
      .map(validation => validation.message.length)
      .reduce(findLargestReducer, 0);

    validationErrors.forEach((validation) => {
      const lineText = this.padString(`${validation.line}:${validation.column}`, longestLineChars);
      const line = chalk.gray(lineText);
      const errorTxt = this.padString(validation.message, longestMsgChars);
      const error = chalk.white(errorTxt);

      this.log(`  ${line}  ${error}`);
    });
    this.log('\n');
  }

  /**
  * If string's length is less than longest, appends spaces until it reaches the
  * same length
  */
  private static padString(string: string, longest: number) {
    if (string.length < longest) {
      Array(longest - string.length)
        .fill(null)
        .forEach(() => { string += ' '; });
    }
    return string;
  }
}
