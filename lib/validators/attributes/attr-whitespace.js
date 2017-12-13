"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AttrWhitespace = (function () {
    function AttrWhitespace() {
    }
    AttrWhitespace.validate = function (attr, whitespace) {
        var split = attr.split('=');
        var before = split[0].match(/\s+$/);
        var after = split[1].match(/^\s+/);
        var valid;
        if (whitespace === 0) {
            valid = !before && !after;
        }
        else {
            valid = before && before.length === whitespace && after && after.length === whitespace;
        }
        return valid;
    };
    return AttrWhitespace;
}());
exports.AttrWhitespace = AttrWhitespace;
//# sourceMappingURL=attr-whitespace.js.map