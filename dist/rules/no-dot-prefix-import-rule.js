"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = rule;
exports.ruleName = exports.messages = void 0;

var _stylelint = require("stylelint");

var _utils = require("../utils");

var ruleName = (0, _utils.namespace)('no-dot-prefix-import-rule');
exports.ruleName = ruleName;

var messages = _stylelint.utils.ruleMessages(ruleName, {
  expected: 'Import path should not start with dot'
});

exports.messages = messages;

function rule(allowedAliasList) {
  return function (root, result) {
    ['use', 'import'].forEach(function (rule) {
      root.walkAtRules(rule, function (atRule) {
        if ((0, _utils.extractImportPath)(atRule).startsWith('.')) {
          _stylelint.utils.report({
            message: messages.expected,
            node: atRule,
            result: result,
            ruleName: ruleName
          });
        }
      });
    });
  };
}

rule.ruleName = ruleName;
rule.messages = messages;