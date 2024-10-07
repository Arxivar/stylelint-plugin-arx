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

var _noExplicitStyleKey = _interopRequireDefault(require("./no-explicit-style-key"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  'deprecate-import-for-use': _deprecateImportForUse["default"],
  'at-rule-use-file-name-starts-with': _atRuleUseFileNameStartsWith["default"],
  'no-dot-prefix-import-rule': _noDotPrefixImportRule["default"],
  'no-scss-color-variables': _noScssColorVariables["default"],
  'no-use-mixins-or-placeholders': _noUseMixinsOrPlaceholders["default"],
  'no-explicit-style-key': _noExplicitStyleKey["default"]
};
exports["default"] = _default;