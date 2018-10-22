import chalk from 'chalk';
import { Linter } from './linter';
import * as commander from 'commander';
import * as fs from 'fs';
import Logger from './utils/logger';

let fileList: string[];
const program = commander
  .version('1.0.0')
  .option('--config [filePath]', 'config file')
  .arguments('[fileList...]')
  .action((args: string[]) => fileList = args.length > 0 ? args : undefined)
  .parse(process.argv);

const configFilePath = program.config;
if (!configFilePath) {
  onError('Need to provide html-linter config file');
} else {
  fs.readFile(configFilePath, (fileError, data) => {
    if (fileError) {
      onError(`Error loading config file ${configFilePath}`);
    } else {
      const configJson = JSON.parse(data.toString());
      Linter.lint(configJson, fileList)
        .then(numErrors => {
          if (numErrors === 0) {
            process.exit(0);
          } else {
            process.exit(1);
          }
        })
        .catch(lintError => {
          onError(chalk.red(lintError.toString()));
        });
    }
  });
}

function onError(error: string) {
  Logger.log(chalk.red(error));
  process.exit(1);
}

