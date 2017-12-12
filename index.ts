import * as fs from 'fs';
import * as colors from 'colors';

const files = ['../ng-website/src/app/app.component.html'];
const errors: string[] = [];

function lint() {
  let lintedCount = 0;
  files.forEach(filePath => {
    fs.readFile(filePath, (error, data) => {
      const fileString = data.toString();
      validateIndentation(filePath, fileString);

      if (++lintedCount === files.length) {
        onLintingComplete();
      }
    });
  });
}

function onLintingComplete() {
  if (errors.length === 0) {
    console.log(colors.green('All files pass linting'));
  } else {
    errors.forEach(errorMsg => console.log(colors.red(errorMsg)));
  }
}

function validateIndentation(filePath: string, fileString: string) {
  // todo: configure character and num
  const indentation = 2;

  const lines = fileString.split('\n');
  let prevStartIdx = 0;
  lines.forEach((line: string, idx: number) => {
    let startIdx = line.search(/\S/);
    if (startIdx !== -1) {
      const diff = Math.abs(prevStartIdx - startIdx);
      if (diff !== indentation && diff !== 0) {
        errors.push(`${filePath}:${idx} File should use 2 space indentation`);
      }
    } else {
      startIdx = 0;
    }

    prevStartIdx = startIdx;
  });
}

// todo: check attributes use double quotes

// todo: check spaces around equals

lint();
