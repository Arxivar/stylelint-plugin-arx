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

var ruleName = (0, _utils.namespace)('no-use-mixins-or-placeholders');
exports.ruleName = ruleName;

var messages = _stylelint.utils.ruleMessages(ruleName, {
  rejectedMixin: function rejectedMixin(value) {
    return "Avoid using this mixin  ".concat(value);
  },
  rejectedPlaceholder: function rejectedPlaceholder(value) {
    return "Avoid using this placeholder ".concat(value);
  }
});

exports.messages = messages;

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
    root.walkAtRules('include', function (atRule) {
      var _ruleOptions$filesToE;

      var isFileToExclude = ruleOptions === null || ruleOptions === void 0 ? void 0 : (_ruleOptions$filesToE = ruleOptions.filesToExclude) === null || _ruleOptions$filesToE === void 0 ? void 0 : _ruleOptions$filesToE.some(function (pattern) {
        return (0, _minimatch["default"])(sourceFilePath, "**/".concat(pattern));
      });

      if (isFileToExclude) {
        return;
      }

      var mixins = ruleOptions.mixins;
      var resultRegexMixin = regexMixin(mixins); // Cerca il mixin specifico

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
      var _ruleOptions$filesToE2;

      var isFileToExclude = ruleOptions === null || ruleOptions === void 0 ? void 0 : (_ruleOptions$filesToE2 = ruleOptions.filesToExclude) === null || _ruleOptions$filesToE2 === void 0 ? void 0 : _ruleOptions$filesToE2.some(function (pattern) {
        return (0, _minimatch["default"])(sourceFilePath, "**/".concat(pattern));
      });

      if (isFileToExclude) {
        return;
      }

      var placeholders = ruleOptions.placeholders;
      var resultRegexPlaceholders = regexPlaceholder(placeholders); // Cerca il placeholder specifico

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