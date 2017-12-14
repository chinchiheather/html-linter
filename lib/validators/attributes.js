"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var attr_whitespace_1 = require("./attributes/attr-whitespace");
var attr_quotes_1 = require("./attributes/attr-quotes");
var Attributes = (function () {
    function Attributes() {
    }
    Attributes.validate = function (filePath, lines, config) {
        var errors = [];
        var attrRegex = /(\S+)\s*[^(!=)]=\s*["']+((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g;
        var inScriptTag = false;
        lines.forEach(function (line, idx) {
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
                }
            }
        });
        return errors;
    };
    return Attributes;
}());
exports.Attributes = Attributes;
//# sourceMappingURL=attributes.js.map