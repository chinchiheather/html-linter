import * as colors from 'colors';
import { Linter } from './linter';
import * as commander from 'commander';
import * as fs from 'fs';

const program = commander
  .version('1.0.0')
  .option('--config [filePath]', 'config file')
  .parse(process.argv);

const configFilePath = program.config;
if (!configFilePath) {
  console.log(colors.red('Need to provide html-linter config file'));
} else {
  fs.readFile(configFilePath, (error, data) => {
    if (error) {
      console.log(`Error loading config file ${configFilePath}`);
    } else {
      const configJson = JSON.parse(data.toString());
      Linter.lint(configJson)
        .then(errors => {
          if (errors.length === 0) {
            console.log(colors.green('All files pass linting'));
          } else {
            errors.forEach(errorMsg => console.log(colors.red(errorMsg)));
          }
        })
        .catch(error => {
          console.log(colors.red(error.toString()));
        });
    }
  });
}

