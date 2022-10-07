"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = rule;
exports.ruleName = exports.messages = void 0;

var _stylelint = require("stylelint");

var _utils = require("../utils");

var ruleName = (0, _utils.namespace)('at-rule-import-disallow');
exports.ruleName = ruleName;

var messages = _stylelint.utils.ruleMessages(ruleName, {
  expected: '@import is deprecated instead use @use.'
});

exports.messages = messages;

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
        word: atRule.toString(),
        result: result,
        ruleName: ruleName
      });
    });
  };
}