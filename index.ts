import * as fs from 'fs';
import * as colors from 'colors';

// todo: configure files
const files = ['../ng-website/src/app/app.component.html'];
const errors: string[] = [];

function lint() {
  let lintedCount = 0;
  files.forEach(filePath => {
    fs.readFile(filePath, (error, data) => {
      const fileString = data.toString();
      validateIndentation(filePath, fileString);
      validateAttrQuotes(filePath, fileString);

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
        errors.push(`${filePath}:${idx + 1} File should use 2 space indentation`);
      }
    } else {
      startIdx = 0;
    }

    prevStartIdx = startIdx;
  });
}

function validateAttrQuotes(filePath: string, fileString: string) {
  // todo: configure which quotes
  const quote = `"`;

  const attrRegex = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g;

  const lines = fileString.split('\n');
  lines.forEach((line: string, idx: number) => {
    const attrs = line.match(attrRegex);
    if (attrs) {
      attrs.forEach(attrMatch => {
        const split = attrMatch.split('=');
        const attrQuote = split[1].replace(/s/g, '').charAt(0);
        if (attrQuote !== quote) {
          errors.push(`${filePath}:${idx + 1} Attributes should use single quotes`);
        }
      });
    }
  });
}

// todo: check spaces around equals

lint();
