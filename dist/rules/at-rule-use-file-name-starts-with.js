"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = rule;
exports.ruleName = exports.messages = void 0;

var _minimatch = _interopRequireDefault(require("minimatch"));

var _stylelint = require("stylelint");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var modes = {
  REQUIRED: 'required',
  BLOCK: 'block'
};
var ruleName = (0, _utils.namespace)('at-rule-use-file-name-starts-with');
exports.ruleName = ruleName;

var messages = _stylelint.utils.ruleMessages(ruleName, {
  expected: function expected(errorMessage) {
    return errorMessage;
  }
});

exports.messages = messages;

function rule(ruleOptions) {
  return function (root, result) {
    var _root$source$input$fi, _ruleOptions$filter;

    var sourceFilePath = (_root$source$input$fi = root.source.input.file) === null || _root$source$input$fi === void 0 ? void 0 : _root$source$input$fi.replace(/\\/g, '/'); // try to match a rule

    var matchedRule = (_ruleOptions$filter = ruleOptions.filter(function (rule) {
      return rule.files.some(function (pattern) {
        return (0, _minimatch["default"])(sourceFilePath, "**/".concat(pattern));
      });
    })) === null || _ruleOptions$filter === void 0 ? void 0 : _ruleOptions$filter[0];

    if (!matchedRule) {
      return;
    }

    root.walkAtRules('use', function (atRule) {
      var atRuleFilePath = (0, _utils.extractImportPath)(atRule);
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