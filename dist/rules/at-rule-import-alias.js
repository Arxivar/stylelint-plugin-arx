"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ruleName = exports.messages = exports["default"] = void 0;

var _minimatch = _interopRequireDefault(require("minimatch"));

var _postcss = require("postcss");

var _stylelint = require("stylelint");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ruleName = (0, _utils.namespace)('import-notation');
exports.ruleName = ruleName;

var messages = _stylelint.utils.ruleMessages(ruleName, {
  expected: 'Import path should starts with alias'
});

exports.messages = messages;

function walkCallback(_ref) {
  var atRule = _ref.atRule,
      message = _ref.message,
      report = _ref.report,
      result = _ref.result,
      ruleName = _ref.ruleName;
  var importPath = (0, _utils.extractImportPath)(atRule);
  var isMatching = importPath.startsWith('.');

  if (!isMatching) {
    report({
      message: message,
      node: atRule,
      word: atRule.toString(),
      result: result,
      ruleName: ruleName
    });
  }
}

function rule(allowedAliasList) {
  return function (root, result) {
    ['use', 'import'].forEach(function (rule) {
      root.walkAtRules(rule, function (atRule) {
        walkCallback({
          allowedAliasList: allowedAliasList,
          atRule: atRule,
          result: result,
          ruleName: ruleName,
          message: messages.expected,
          report: _stylelint.utils.report
        });
      });
    });
  };
}

rule.primaryOptionArray = true;
var _default = rule;
exports["default"] = _default;