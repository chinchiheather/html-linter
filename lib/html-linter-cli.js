"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var linter_1 = require("./linter");
var commander = require("commander");
var fs = require("fs");
var logger_1 = require("./utils/logger");
var fileList;
var program = commander
    .version('1.0.0')
    .option('--config [filePath]', 'config file')
    .arguments('[fileList...]')
    .action(function (args) { return fileList = args.length > 0 ? args : undefined; })
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
                .then(function (numErrors) {
                if (numErrors === 0) {
                    process.exit(0);
                }
                else {
                    process.exit(1);
                }
            })
                .catch(function (error) {
                onError(chalk_1.default.red(error.toString()));
            });
        }
    });
}
function onError(error) {
    logger_1.default.log(chalk_1.default.red(error));
    process.exit(1);
}
