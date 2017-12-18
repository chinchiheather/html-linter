# html-linter
A simple linter to check the formatting of the html files in your project  
Designed to be similar to how tslint and sass-lint work unlike other html linters which load urls and check the validity of the html page

## Usage
Either
```
npm install --global html-linter
html-linter --config path-to-html-linter-config.json
```
Or
```
npm install --save-dev html-linter

// add a script in your package.json
"scripts": {
  "lint:html": "html-linter --config path-to-html-linter-config.json"
}
```
The --config flag is required and should be the path to the configuration file for html-linter

If you want to specify the files to lint in the command line, pass these as arguments and they will override the files property in the config file
```
html-linter --config path-to-html-linter-config.json file1.html dir/**/*.html
```


## Configuration
You need to pass in a json configuration file that specifies the rules you want to enforce  
Any properties not present in this file will not be checked  
See the [example config file](https://github.com/chinchiheather/html-linter/blob/master/html-linter.json)  

```
files: string[];                      // array of files to check, can use glob patterns
indentation: {
  char: 'space' | 'tab';              // character indentation should use
  number: number;                     // number of indentation characters file should use
};
attributes: {
  quotes: 'single' | 'double';        // quote character that attribute values should use
  whitespace: number;                 // number of whitespace characters there should be around the '=' character
  vertical-align: boolean;            // whether attributes should align vertically
};
```
