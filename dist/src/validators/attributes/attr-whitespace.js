"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AttrWhitespace = (function () {
    function AttrWhitespace() {
    }
    AttrWhitespace.validate = function (attr) {
        var whitespace = 0;
        var split = attr.split('=');
        var before = split[0].match(/\s+$/);
        var after = split[1].match(/^\s+/);
        return !before && !after;
    };
    AttrWhitespace.errorMsg = "Attributes should have no whitespace around '=' character";
    return AttrWhitespace;
}());
exports.AttrWhitespace = AttrWhitespace;
//# sourceMappingURL=attr-whitespace.js.map