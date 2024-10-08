"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = rule;
exports.ruleName = exports.meta = exports.messages = void 0;
var _stylelint = require("stylelint");
var _utils = require("../utils");
var ruleName = exports.ruleName = (0, _utils.namespace)('deprecate-import-for-use');
var messages = exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  expected: "'@import' is deprecated. Instead use '@use'"
});
var meta = exports.meta = {
  description: 'Sass lang documentation',
  url: 'https://sass-lang.com/documentation/at-rules/use'
};
function rule(option) {
  return function (root, result) {
    var validOptions = _stylelint.utils.validateOptions(result, ruleName, {
      actual: option
    });
    if (!validOptions) {
      return;
    }
    root.walkAtRules('import', function (atRule) {
      _stylelint.utils.report({
        message: messages.expected,
        node: atRule,
        result: result,
        ruleName: ruleName
      });
    });
  };
}
rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;