"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colors = require("colors");
var linter_1 = require("./linter");
var commander = require("commander");
var fs = require("fs");
var fileList;
var program = commander
    .version('1.0.0')
    .option('--config [filePath]', 'config file')
    .arguments('[fileList...]')
    .action(function (args) { return fileList = args; })
    .parse(process.argv);
var configFilePath = program.config;
if (!configFilePath) {
    onError('Need to provide html-linter config file');
}
else {
    fs.readFile(configFilePath, function (error, data) {
        if (error) {
            onError("Error loading config file " + configFilePath);
        }
        else {
            var configJson = JSON.parse(data.toString());
            linter_1.Linter.lint(configJson, fileList)
                .then(function (errors) {
                if (errors.length === 0) {
                    console.log(colors.green('All files pass linting'));
                }
                else {
                    errors.forEach(function (errorMsg) { return console.log(errorMsg); });
                    process.exit(1);
                }
            })
                .catch(function (error) {
                onError(colors.red(error.toString()));
            });
        }
    });
}
function onError(error) {
    console.log(colors.red(error));
    process.exit(1);
}
