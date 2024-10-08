"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = rule;
exports.ruleName = exports.messages = void 0;
var _stylelint = require("stylelint");
var _arxService = require("../arxService");
var ruleName = exports.ruleName = _arxService.arxService.namespace('no-explicit-style-key');
var messages = exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  rejected: function rejected(variable) {
    return "Avoid using ".concat(variable, ", use Mixins instead");
  }
});
function rule(ruleOptions) {
  return function (root, result) {
    // check if file is to exclude
    var isFileToExclude = _arxService.arxService.isFileMatched(root, ruleOptions === null || ruleOptions === void 0 ? void 0 : ruleOptions.filesToExclude);
    if (isFileToExclude) {
      return;
    }
    root.walkDecls(function (style) {
      var _ruleOptions$propsToC;
      if (ruleOptions !== null && ruleOptions !== void 0 && (_ruleOptions$propsToC = ruleOptions.propsToCheck) !== null && _ruleOptions$propsToC !== void 0 && _ruleOptions$propsToC.includes(style.prop)) {
        _stylelint.utils.report({
          message: messages.rejected(style.prop),
          node: style,
          result: result,
          ruleName: ruleName
        });
      }
    });
  };
}
rule.ruleName = ruleName;
rule.messages = messages;