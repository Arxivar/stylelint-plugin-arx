"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = rule;
exports.ruleName = exports.messages = void 0;
var _stylelint = require("stylelint");
var _arxService = require("../arxService");
var ruleName = exports.ruleName = _arxService.arxService.namespace('no-dot-prefix-import-rule');
var messages = exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  expected: 'Import path should not start with dot'
});
function rule(allowedAliasList) {
  return function (root, result) {
    ['use', 'import'].forEach(function (rule) {
      root.walkAtRules(rule, function (atRule) {
        if (_arxService.arxService.extractImportPath(atRule).startsWith('.')) {
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