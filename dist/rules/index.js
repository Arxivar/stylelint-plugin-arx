"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _deprecateImportForUse = _interopRequireDefault(require("./deprecate-import-for-use"));
var _atRuleUseFileNameStartsWith = _interopRequireDefault(require("./at-rule-use-file-name-starts-with"));
var _noDotPrefixImportRule = _interopRequireDefault(require("./no-dot-prefix-import-rule"));
var _noScssColorVariables = _interopRequireDefault(require("./no-scss-color-variables"));
var _noUseMixinsOrPlaceholders = _interopRequireDefault(require("./no-use-mixins-or-placeholders"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = exports["default"] = {
  'deprecate-import-for-use': _deprecateImportForUse["default"],
  'at-rule-use-file-name-starts-with': _atRuleUseFileNameStartsWith["default"],
  'no-dot-prefix-import-rule': _noDotPrefixImportRule["default"],
  'no-scss-color-variables': _noScssColorVariables["default"],
  'no-use-mixins-or-placeholders': _noUseMixinsOrPlaceholders["default"],
  'no-explicit-style-key': noExplicitStyleKey
};