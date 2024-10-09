"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _stylelint = require("stylelint");
var _arxService = require("../arxService");
// Define the rule name using a namespace pattern from arxService
var ruleName = _arxService.arxService.namespace('deprecate-import-for-use');
// Define the messages for rule violations
var messages = _stylelint.utils.ruleMessages(ruleName, {
  expected: "'@import' is deprecated. Instead use '@use'"
});
var meta = {
  description: 'Sass lang documentation',
  url: 'https://sass-lang.com/documentation/at-rules/use'
};
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

    // Scorre tutte le regole "@import" nel file CSS o Sass
    root.walkAtRules('import', function (atRule) {
      // Genera un report di errore ogni volta che viene trovato un "@import"
      _stylelint.utils.report({
        message: messages.expected,
        node: atRule,
        result: result,
        ruleName: ruleName
      });
    });
  };
};

// Complete the stylelint rule
var rule = Object.assign(ruleBase, {
  ruleName: ruleName,
  messages: messages,
  meta: meta
});
var _default = exports["default"] = rule;