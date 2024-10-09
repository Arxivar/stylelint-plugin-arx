"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _stylelint = require("stylelint");
var _arxService = require("../arxService");
// Define the rule name using a namespace pattern from arxService
var ruleName = _arxService.arxService.namespace('no-dot-prefix-import-rule');
// Define the messages for rule violations
var messages = _stylelint.utils.ruleMessages(ruleName, {
  expected: 'Import path should not start with dot'
});
var ruleBase = function ruleBase(ruleOptions) {
  return function (root, result) {
    var _ruleSettings$ruleOpt;
    var ruleSettings = _arxService.arxService.getRuleSettings(ruleOptions);
    if (!ruleSettings.isRuleActive) {
      return;
    }
    // Check if the file matches the exclusion criteria (skip the rule if it does)
    var isFileToExclude = _arxService.arxService.isFileMatched(root, (_ruleSettings$ruleOpt = ruleSettings.ruleOptions) === null || _ruleSettings$ruleOpt === void 0 ? void 0 : _ruleSettings$ruleOpt.filesToExclude);
    // If the file should be excluded, stop further processing
    if (isFileToExclude) {
      return;
    }
    ['use', 'import'].forEach(function (rule) {
      root.walkAtRules(rule, function (atRule) {
        // Verifica se il percorso dell'importazione (estratto da arxService) inizia con un punto ('.')
        // Un percorso che inizia con '.' rappresenta un percorso relativo.
        if (_arxService.arxService.extractImportPath(atRule).startsWith('.')) {
          // Se il percorso inizia con '.', genera un report di violazione
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
};

// Complete the stylelint rule
var rule = Object.assign(ruleBase, {
  ruleName: ruleName,
  messages: messages
});
var _default = exports["default"] = rule;