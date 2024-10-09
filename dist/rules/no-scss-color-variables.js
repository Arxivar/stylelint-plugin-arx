"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _stylelint = require("stylelint");
var _arxService = require("../arxService");
// Define the rule name using a namespace pattern from arxService
var ruleName = _arxService.arxService.namespace('no-scss-color-variables');
// Define the messages for rule violations
var messages = _stylelint.utils.ruleMessages(ruleName, {
  rejected: function rejected(variable) {
    return "Avoid using SCSS color variable ".concat(variable, ", use mixins instead");
  }
});
var ruleBase = function ruleBase(ruleOptions) {
  return function (root, result) {
    // Check if the file matches the exclusion criteria (skip the rule if it does)
    var isFileToExclude = _arxService.arxService.isFileMatched(root, ruleOptions === null || ruleOptions === void 0 ? void 0 : ruleOptions.filesToExclude);
    // If the file should be excluded, stop further processing
    if (isFileToExclude) {
      return;
    }

    // Define the possible types of variables that need to be checked
    var possibleTypes = 'Theme|Primary|Secondary|Success|Warning|Danger|Info';

    // Regular expression to detect SCSS background variables
    var regexBackground = new RegExp("\\$arx(".concat(possibleTypes, ")Background(Main|Below|Above|Hover|Selected|Disabled)\\b"), 'g');

    // Regular expression to detect SCSS color variables
    var regexColor = new RegExp("\\$arx(".concat(possibleTypes, ")Color(Highlighted|Ordinary|Hover|Selected|Disabled)\\b"), 'g');

    // Iterate through each declaration in the stylesheet
    root.walkDecls(function (style) {
      // If a style declaration value matches the background or color variable patterns
      if (style.value.match(regexBackground) || style.value.match(regexColor)) {
        // add the error message to show
        _stylelint.utils.report({
          message: messages.rejected(style.value),
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