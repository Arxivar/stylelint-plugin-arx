"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = rule;
exports.ruleName = exports.messages = void 0;
var _stylelint = require("stylelint");
var _arxService = require("../arxService");
var modes = {
  REQUIRED: 'required',
  BLOCK: 'block'
};
var ruleName = exports.ruleName = _arxService.arxService.namespace('at-rule-use-file-name-starts-with');
var messages = exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  expected: function expected(errorMessage) {
    return errorMessage;
  }
});
function rule(ruleOptions) {
  return function (root, result) {
    var _ruleOptions$filter;
    // try to match a rule
    var matchedRule = (_ruleOptions$filter = ruleOptions.filter(function (rule) {
      return _arxService.arxService.isFileMatched(root, rule.files);
    })) === null || _ruleOptions$filter === void 0 ? void 0 : _ruleOptions$filter[0];
    if (!matchedRule) {
      return;
    }
    root.walkAtRules('use', function (atRule) {
      var atRuleFilePath = _arxService.arxService.extractImportPath(atRule);
      var startsWithMatchList = [];
      if (Array.isArray(matchedRule.startWith)) {
        startsWithMatchList = matchedRule.startWith;
      } else {
        startsWithMatchList = [matchedRule.startWith];
      }
      if (matchedRule.mode === modes.BLOCK) {
        startsWithMatchList.forEach(function (startWithString) {
          if (atRuleFilePath.startsWith(startWithString)) {
            _stylelint.utils.report({
              message: messages.expected(matchedRule.errorMessage),
              node: atRule,
              result: result,
              ruleName: ruleName
            });
          }
        });
      } else if (matchedRule.mode.REQUIRED) {}
    });
  };
}
rule.primaryOptionArray = true;
rule.ruleName = ruleName;
rule.messages = messages;