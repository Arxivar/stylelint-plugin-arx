import deprecateImportForUse from './deprecate-import-for-use';
import atRuleUseFileNameStartsWith from './at-rule-use-file-name-starts-with';
import noDotPrefixImportRule from './no-dot-prefix-import-rule';
import noScssColorVariables from './no-scss-color-variables';
import noUseMixinsOrPlaceholders from './no-use-mixins-or-placeholders';

export default {
  'deprecate-import-for-use': deprecateImportForUse,
  'at-rule-use-file-name-starts-with': atRuleUseFileNameStartsWith,
  'no-dot-prefix-import-rule': noDotPrefixImportRule,
  'no-scss-color-variables': noScssColorVariables,
  'no-use-mixins-or-placeholders': noUseMixinsOrPlaceholders,
  'no-explicit-style-key': noExplicitStyleKey,
};
