"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _stylelint = require("stylelint");
var _rules = _interopRequireDefault(require("./rules/"));
var _arxService = require("./arxService");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var rulePluginList = Object.keys(_rules["default"]).map(function (ruleName) {
  return (0, _stylelint.createPlugin)(_arxService.arxService.namespace(ruleName), _rules["default"][ruleName]);
});
var _default = exports["default"] = rulePluginList;