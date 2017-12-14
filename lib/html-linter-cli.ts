import * as colors from 'colors';
import { Linter } from './linter';
import * as commander from 'commander';
import * as fs from 'fs';

let fileList: string[];
const program = commander
  .version('1.0.0')
  .option('--config [filePath]', 'config file')
  .arguments('[fileList...]')
  .action((args: string[]) => fileList = args)
  .parse(process.argv);

const configFilePath = program.config;
if (!configFilePath) {
  onError('Need to provide html-linter config file');
} else {
  fs.readFile(configFilePath, (error, data) => {
    if (error) {
      onError(`Error loading config file ${configFilePath}`);
    } else {
      const configJson = JSON.parse(data.toString());
      Linter.lint(configJson, fileList)
        .then(errors => {
          if (errors.length === 0) {
            console.log(colors.green('All files pass linting'));
          } else {
            errors.forEach(errorMsg => console.log(errorMsg));
            process.exit(1);
          }
        })
        .catch(error => {
          onError(colors.red(error.toString()));
        });
    }
  });
}

function onError(error: string) {
  console.log(colors.red(error));
  process.exit(1);
}

