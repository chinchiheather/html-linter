"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var colors = require("colors");
var linter_1 = require("./linter");
var commander = require("commander");
var fs = require("fs");
var program = commander
    .version('1.0.0')
    .option('--config [filePath]', 'config file')
    .parse(process.argv);
var configFilePath = program.config;
if (!configFilePath) {
    console.log(colors.red('Need to provide html-linter config file'));
}
else {
    fs.readFile(configFilePath, function (error, data) {
        if (error) {
            console.log("Error loading config file " + configFilePath);
        }
        else {
            var configJson = __assign({}, JSON.parse(data.toString()));
            linter_1.Linter.lint(configJson)
                .then(function (errors) {
                if (errors.length === 0) {
                    console.log(colors.green('All files pass linting'));
                }
                else {
                    errors.forEach(function (errorMsg) { return console.log(colors.red(errorMsg)); });
                }
            })
                .catch(function (error) {
                console.log(colors.red(error.toString()));
            });
        }
    });
}
//# sourceMappingURL=html-linter-cli.js.map