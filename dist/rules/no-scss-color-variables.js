"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = rule;
exports.ruleName = exports.messages = void 0;
var _stylelint = require("stylelint");
var _utils = require("../utils");
var ruleName = exports.ruleName = (0, _utils.namespace)('no-scss-color-variables');
var possibleTypes = 'Theme|Primary|Secondary|Success|Warning|Danger|Info';
var regexBackground = new RegExp("/$arx(".concat(possibleTypes, ")Background(Main|Below|Above|Hover|Selected|Disabled)/g"));
var regexColor = new RegExp("/$arx(".concat(possibleTypes, ")Color(Highlighted|Ordinary|Hover|Selected|Disabled)/g"));
var messages = exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  rejected: function rejected(variable) {
    return "Avoid using SCSS color variable ".concat(variable, ", use Mixins instead");
  }
});
function rule(option) {
  return function (root, result) {
    root.walkDecls(function (style) {
      if (style.value.match(regexBackground) || style.value.match(regexColor)) {
        _stylelint.utils.report({
          message: messages.rejected(style.value),
          node: style,
          result: result,
          ruleName: ruleName
        });
      }
    });
  };
}
rule.ruleName = ruleName;
rule.messages = messages;