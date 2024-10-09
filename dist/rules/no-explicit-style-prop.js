"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _stylelint = require("stylelint");
var _arxService = require("../arxService");
// Define the rule name using a namespace pattern from arxService
var ruleName = _arxService.arxService.namespace('no-explicit-style-prop');
// Define the messages for rule violations
var messages = _stylelint.utils.ruleMessages(ruleName, {
  rejected: function rejected(prop) {
    return "Do not set the prop ".concat(prop, " directly");
  }
});
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
    root.walkDecls(function (style) {
      var _ruleSettings$ruleOpt2;
      // Check if the style property is to lock
      if ((_ruleSettings$ruleOpt2 = ruleSettings.ruleOptions) !== null && _ruleSettings$ruleOpt2 !== void 0 && (_ruleSettings$ruleOpt2 = _ruleSettings$ruleOpt2.propsToLock) !== null && _ruleSettings$ruleOpt2 !== void 0 && _ruleSettings$ruleOpt2.includes(style.prop)) {
        // add the error message to show
        _stylelint.utils.report({
          message: messages.rejected(style.prop),
          node: style,
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