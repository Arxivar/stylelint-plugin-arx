"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = rule;
exports.ruleName = exports.messages = void 0;

var _stylelint = require("stylelint");

var _utils = require("../utils");

var ruleName = (0, _utils.namespace)('no-scss-variables');
exports.ruleName = ruleName;
var regexBackground = new RegExp(/arx.*Background(Main|Below|Above|Hover|Selected|Disabled)/g);
var regexColor = new RegExp(/arx.*Color(Highlighted|Ordinary|Hover|Selected|Disabled)/g);

var messages = _stylelint.utils.ruleMessages(ruleName, {
  rejected: function rejected(variable) {
    return "Avoid using SCSS variable ".concat(variable);
  }
});

exports.messages = messages;

function rule(option) {
  return function (root, result) {
    root.walkDecls(function (decl) {
      if (decl.value.match(regexBackground) || decl.value.match(regexColor)) {
        _stylelint.utils.report({
          message: messages.rejected(decl.value),
          node: decl,
          result: result,
          ruleName: ruleName
        });
      }
    });
  };
}

rule.ruleName = ruleName;
rule.messages = messages;