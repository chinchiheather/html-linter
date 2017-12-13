"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var indentation_1 = require("./validators/indentation");
var attributes_1 = require("./validators/attributes");
var glob = require("glob");
var Linter = (function () {
    function Linter() {
    }
    Linter.lint = function (config) {
        return new Promise(function (resolve, reject) {
            var errors = [];
            var filePaths = config.files;
            var lintedCount = 0;
            if (!Array.isArray(filePaths)) {
                reject('files must be an array of file paths to lint (glob patterns are allowed)');
            }
            else {
                if (filePaths.length === 0) {
                    reject('No files to lint');
                }
                else {
                    filePaths.forEach(function (filePath) {
                        glob(filePath, function (error, files) {
                            files.forEach(function (file) {
                                fs.readFile(file, function (error, data) {
                                    if (error) {
                                        reject(error.toString());
                                    }
                                    else {
                                        var fileString = data.toString();
                                        var lines = fileString.split('\n');
                                        if (config.indentation) {
                                            errors.push.apply(errors, indentation_1.Indentation.validate(file, lines, config.indentation));
                                        }
                                        if (config.attributes) {
                                            errors.push.apply(errors, attributes_1.Attributes.validate(file, lines, config.attributes));
                                        }
                                        if (++lintedCount === filePaths.length) {
                                            resolve(errors);
                                        }
                                    }
                                });
                            });
                        });
                    });
                }
            }
        });
    };
    return Linter;
}());
exports.Linter = Linter;
//# sourceMappingURL=linter.js.map