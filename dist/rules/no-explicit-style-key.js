"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _stylelint = require("stylelint");
var _arxService = require("../arxService");
// Define the rule name using a namespace pattern from arxService
var ruleName = _arxService.arxService.namespace('no-explicit-style-key');
// Define the messages for rule violations
var messages = _stylelint.utils.ruleMessages(ruleName, {
  rejected: function rejected(variable) {
    return "Avoid using ".concat(variable, ", use Mixins instead");
  }
});
var ruleBase = function ruleBase(ruleOptions) {
  return function (root, result) {
    // check if file is to exclude
    var isFileToExclude = _arxService.arxService.isFileMatched(root, ruleOptions === null || ruleOptions === void 0 ? void 0 : ruleOptions.filesToExclude);
    if (isFileToExclude) {
      return;
    }
    root.walkDecls(function (style) {
      var _ruleOptions$propsToC;
      // If the property is in the propsToCheck list, report it
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
};

// Complete the stylelint rule
var rule = Object.assign(ruleBase, {
  ruleName: ruleName,
  messages: messages
});
var _default = exports["default"] = rule;