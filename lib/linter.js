"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var indentation_1 = require("./validators/indentation");
var attributes_1 = require("./validators/attributes");
var glob = require("glob");
var logger_1 = require("./utils/logger");
var chalk_1 = require("chalk");
var Linter = /** @class */ (function () {
    function Linter() {
    }
    Linter.lint = function (config, fileList) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var errors = [];
            var filePaths = fileList || config.files;
            if (!Array.isArray(filePaths)) {
                reject('files must be an array of file paths to lint (glob patterns are allowed)');
            }
            else {
                if (filePaths.length === 0) {
                    reject('No files to lint');
                }
                else {
                    var promises_1 = [];
                    filePaths.forEach(function (filePath) {
                        promises_1.push(_this.checkFile(filePath, config));
                    });
                    Promise.all(promises_1).then(function (results) {
                        var numErrors = results.reduce(function (prev, curr) { return prev + (curr && curr.length || 0); }, 0);
                        if (numErrors === 0) {
                            logger_1.default.log(chalk_1.default.green('All files pass linting'));
                        }
                        resolve(numErrors);
                    });
                }
            }
        });
    };
    Linter.checkFile = function (filePath, config) {
        return new Promise(function (resolve) {
            glob(filePath, function (error, files) {
                if (error) {
                    logger_1.default.logResults(filePath, [{
                            line: 0,
                            column: 0,
                            message: error.toString()
                        }]);
                }
                else {
                    var filesRead_1 = 0;
                    files.forEach(function (file) {
                        fs.readFile(file, function (error, data) {
                            var errors = [];
                            if (error) {
                                logger_1.default.logResults(file, [{
                                        line: 0,
                                        column: 0,
                                        message: error.toString()
                                    }]);
                            }
                            else {
                                var fileString = data.toString();
                                var lines = fileString.split('\n');
                                if (config.indentation) {
                                    errors.push.apply(errors, indentation_1.Indentation.validate(lines, config.indentation));
                                }
                                if (config.attributes) {
                                    errors.push.apply(errors, attributes_1.Attributes.validate(lines, config.attributes));
                                }
                                if (errors.length > 0) {
                                    logger_1.default.logResults(file, errors);
                                }
                            }
                            if (++filesRead_1 === files.length) {
                                resolve(errors);
                            }
                        });
                    });
                }
            });
        });
    };
    return Linter;
}());
exports.Linter = Linter;
