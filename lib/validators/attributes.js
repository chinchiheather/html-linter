"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var attr_whitespace_1 = require("./attributes/attr-whitespace");
var attr_quotes_1 = require("./attributes/attr-quotes");
var Attributes = /** @class */ (function () {
    function Attributes() {
    }
    Attributes.validate = function (filePath, lines, config) {
        var errors = [];
        var attrRegex = /(\S+)(\s|[\w\)\]])=\s*["']+/g;
        var inScriptTag = false;
        var currentIdentation = -1;
        lines.forEach(function (line, idx) {
            // don't want to check contents of script tags
            if (inScriptTag) {
                if (line.indexOf('</script') !== -1) {
                    inScriptTag = false;
                }
            }
            else if (line.indexOf('<script') !== -1) {
                inScriptTag = true;
            }
            else {
                var attrMatches = line.match(attrRegex);
                if (attrMatches) {
                    attrMatches.forEach(function (attrMatch) {
                        if (config.whitespace != null && !attr_whitespace_1.AttrWhitespace.validate(attrMatch, config.whitespace)) {
                            errors.push("ERROR: " + filePath + "[" + (idx + 1) + "]: Attributes should have " + config.whitespace + " whitespace around '=' character");
                        }
                        if (config.quotes && !attr_quotes_1.AttrQuotes.validate(attrMatch, config.quotes)) {
                            errors.push("ERROR: " + filePath + "[" + (idx + 1) + "]: Attributes should use " + config.quotes + " quotes");
                        }
                    });
                    if (config['vertical-align']) {
                        var firstAttrIdx = line.search(attrRegex);
                        var substring = line.substring(0, firstAttrIdx);
                        if (/<[a-zA-Z0-9-]+\s$/.test(substring)) {
                            currentIdentation = firstAttrIdx;
                        }
                        else {
                            if (currentIdentation !== firstAttrIdx) {
                                errors.push("ERROR: " + filePath + "[" + (idx + 1) + "]: Attributes should vertically align");
                            }
                        }
                    }
                }
            }
        });
        return errors;
    };
    return Attributes;
}());
exports.Attributes = Attributes;
