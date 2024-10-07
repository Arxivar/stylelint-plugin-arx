"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = rule;
exports.ruleName = exports.messages = void 0;

var _stylelint = require("stylelint");

var _utils = require("../utils");

var _minimatch = _interopRequireDefault(require("minimatch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ruleName = (0, _utils.namespace)('no-explicit-style-key');
exports.ruleName = ruleName;

var messages = _stylelint.utils.ruleMessages(ruleName, {
  rejected: function rejected(variable) {
    return "Avoid using ".concat(variable, ", use Mixins instead");
  }
});

exports.messages = messages;

function rule(ruleOptions) {
  return function (root, result) {
    root.walkDecls(function (style) {
      var _ruleOptions$filesToE, _ruleOptions$propsToC;

      var isFileToExclude = ruleOptions === null || ruleOptions === void 0 ? void 0 : (_ruleOptions$filesToE = ruleOptions.filesToExclude) === null || _ruleOptions$filesToE === void 0 ? void 0 : _ruleOptions$filesToE.some(function (pattern) {
        return (0, _minimatch["default"])(sourceFilePath, "**/".concat(pattern));
      });

      if (isFileToExclude) {
        return;
      }

      if (ruleOptions !== null && ruleOptions !== void 0 && (_ruleOptions$propsToC = ruleOptions.propsToCheck) !== null && _ruleOptions$propsToC !== void 0 && _ruleOptions$propsToC.includes(style.prop)) {
        _stylelint.utils.report({
          message: messages.rejected(style.prop),
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