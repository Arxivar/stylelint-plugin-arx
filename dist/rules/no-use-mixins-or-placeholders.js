"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = rule;
exports.ruleName = exports.messages = void 0;
var _stylelint = require("stylelint");
var _arxService = require("../arxService");
var ruleName = exports.ruleName = _arxService.arxService.namespace('no-use-mixins-or-placeholders');
var messages = exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  rejectedMixin: function rejectedMixin(value) {
    return "Avoid using this mixin  ".concat(value);
  },
  rejectedPlaceholder: function rejectedPlaceholder(value) {
    return "Avoid using this placeholder ".concat(value);
  }
});
var regexMixin = function regexMixin(mixins) {
  if ((mixins === null || mixins === void 0 ? void 0 : mixins.length) > 0) {
    var _mixins = mixins.join('|');
    return new RegExp(".*\\.(".concat(_mixins, ")\\b$"), 'g');
  }
  return undefined;
};
var regexPlaceholder = function regexPlaceholder(placeholders) {
  if ((placeholders === null || placeholders === void 0 ? void 0 : placeholders.length) > 0) {
    var _placeholders = placeholders.join('|');
    return new RegExp("%(".concat(_placeholders, ")\\b$"));
  }
  return undefined;
};
function rule(ruleOptions) {
  return function (root, result) {
    // check if file is to exclude
    var isFileToExclude = _arxService.arxService.isFileMatched(root, ruleOptions === null || ruleOptions === void 0 ? void 0 : ruleOptions.filesToExclude);
    if (isFileToExclude) {
      return;
    }
    root.walkAtRules('include', function (atRule) {
      var mixins = ruleOptions === null || ruleOptions === void 0 ? void 0 : ruleOptions.mixins;
      var resultRegexMixin = regexMixin(mixins);

      // Cerca il mixin specifico
      if (resultRegexMixin && atRule.params.match(resultRegexMixin)) {
        _stylelint.utils.report({
          message: messages.rejectedMixin(atRule.params),
          node: atRule,
          result: result,
          ruleName: ruleName
        });
      }
    });
    root.walkAtRules('extend', function (atRule) {
      var placeholders = ruleOptions === null || ruleOptions === void 0 ? void 0 : ruleOptions.placeholders;
      var resultRegexPlaceholders = regexPlaceholder(placeholders);

      // Cerca il placeholder specifico
      if (resultRegexPlaceholders && atRule.params.match(resultRegexPlaceholders)) {
        _stylelint.utils.report({
          message: messages.rejectedPlaceholder(atRule.params),
          node: atRule,
          result: result,
          ruleName: ruleName
        });
      }
    });
  };
}
rule.ruleName = ruleName;
rule.messages = messages;