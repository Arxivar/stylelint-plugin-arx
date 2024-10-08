"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _stylelint = require("stylelint");
var _arxService = require("../arxService");
// Define the rule name using a namespace pattern from arxService
var ruleName = _arxService.arxService.namespace('no-use-mixins-or-placeholders');

// Define the messages for rule violations
var messages = _stylelint.utils.ruleMessages(ruleName, {
  rejectedMixin: function rejectedMixin(value) {
    return "Avoid using this mixin  ".concat(value);
  },
  rejectedPlaceholder: function rejectedPlaceholder(value) {
    return "Avoid using this placeholder ".concat(value);
  }
});

// Helper function to create a regex to match mixins
var regexMixin = function regexMixin(mixins) {
  if ((mixins === null || mixins === void 0 ? void 0 : mixins.length) > 0) {
    var _mixins = mixins.join('|');
    return new RegExp(".*\\.(".concat(_mixins, ")\\b$"), 'g');
  }
  return undefined;
};

// Helper function to create a regex to match placeholders
var regexPlaceholder = function regexPlaceholder(placeholders) {
  if ((placeholders === null || placeholders === void 0 ? void 0 : placeholders.length) > 0) {
    var _placeholders = placeholders.join('|');
    return new RegExp("%(".concat(_placeholders, ")\\b$"));
  }
  return undefined;
};
var ruleBase = function ruleBase(ruleOptions) {
  return function (root, result) {
    var _ruleSettings$ruleOpt;
    var ruleSettings = _arxService.arxService.getRuleSettings(ruleOptions);
    if (!ruleSettings.isRuleActive) {
      return;
    }
    // check if file is to exclude
    var isFileToExclude = _arxService.arxService.isFileMatched(root, (_ruleSettings$ruleOpt = ruleSettings.ruleOptions) === null || _ruleSettings$ruleOpt === void 0 ? void 0 : _ruleSettings$ruleOpt.filesToExclude);
    if (isFileToExclude) {
      return;
    }
    root.walkAtRules('include', function (atRule) {
      var _ruleSettings$ruleOpt2;
      var mixins = (_ruleSettings$ruleOpt2 = ruleSettings.ruleOptions) === null || _ruleSettings$ruleOpt2 === void 0 ? void 0 : _ruleSettings$ruleOpt2.mixins;
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
      var _ruleSettings$ruleOpt3;
      var placeholders = (_ruleSettings$ruleOpt3 = ruleSettings.ruleOptions) === null || _ruleSettings$ruleOpt3 === void 0 ? void 0 : _ruleSettings$ruleOpt3.placeholders;
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
};

// Complete the stylelint rule
var rule = Object.assign(ruleBase, {
  ruleName: ruleName,
  messages: messages
});
var _default = exports["default"] = rule;