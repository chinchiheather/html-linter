#!/usr/bin/env node

import * as colors from 'colors';
import { Linter } from './src/linter';

// todo: configure files
const filePaths = ['test.html'];

Linter.lint(filePaths)
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
