"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _deprecateImportForUse = _interopRequireDefault(require("./deprecate-import-for-use"));

var _atRuleUseFileNameStartsWith = _interopRequireDefault(require("./at-rule-use-file-name-starts-with"));

var _noDotPrefixImportRule = _interopRequireDefault(require("./no-dot-prefix-import-rule"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  'deprecate-import-for-use': _deprecateImportForUse["default"],
  'at-rule-use-file-name-starts-with': _atRuleUseFileNameStartsWith["default"],
  'no-dot-prefix-import-rule': _noDotPrefixImportRule["default"]
};
exports["default"] = _default;