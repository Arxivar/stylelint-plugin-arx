"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _stylelint = require("stylelint");
var _arxService = require("../arxService");
// Define the rule name using a namespace pattern from arxService
var ruleName = _arxService.arxService.namespace('at-rule-use-file-name-starts-with');
// Define the messages for rule violations
var messages = _stylelint.utils.ruleMessages(ruleName, {
  expected: function expected(errorMessage) {
    return errorMessage;
  }
});
var hasValidRuleOptions = function hasValidRuleOptions(ruleOptions) {
  return Array.isArray(ruleOptions) && (ruleOptions === null || ruleOptions === void 0 ? void 0 : ruleOptions.length) > 0;
};
var ruleBase = function ruleBase(ruleOptions) {
  return function (root, result) {
    var _ruleOptions$filter;
    if (!hasValidRuleOptions(ruleOptions)) {
      return;
    }

    // get the first ruleOptions object where the file is included
    var matchedRule = ruleOptions === null || ruleOptions === void 0 || (_ruleOptions$filter = ruleOptions.filter(function (rule) {
      return _arxService.arxService.isFileMatched(root, rule === null || rule === void 0 ? void 0 : rule.files);
    })) === null || _ruleOptions$filter === void 0 ? void 0 : _ruleOptions$filter[0];
    if (!matchedRule) {
      return;
    }
    root.walkAtRules('use', function (atRule) {
      var atRuleFilePath = _arxService.arxService.extractImportPath(atRule);
      var startsWithMatchList = [];

      // Verifica se la regola startWith è un array, altrimenti la trasforma in un array
      if (Array.isArray(matchedRule.startWith)) {
        startsWithMatchList = matchedRule.startWith;
      } else {
        startsWithMatchList = [matchedRule.startWith];
      }
      startsWithMatchList.forEach(function (startWithString) {
        if (atRuleFilePath.startsWith(startWithString)) {
          // Se il file importato inizia con una delle stringhe bloccate, genera un avviso
          _stylelint.utils.report({
            message: messages.expected(matchedRule.errorMessage),
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
  messages: messages,
  primaryOptionArray: true
});
var _default = exports["default"] = rule;