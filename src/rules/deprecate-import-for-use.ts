import { Rule, RuleBase, utils } from 'stylelint';
import { arxService } from '../arxService';
import { DeprecateImportForUseRuleOptions, IsRuleActiveType } from '../types/RuleTypes';

// Define the rule name using a namespace pattern from arxService
const ruleName = arxService.namespace('deprecate-import-for-use');
// Define the messages for rule violations
const messages = utils.ruleMessages(ruleName, {
  expected: "'@import' is deprecated. Instead use '@use'",
});

const meta = {
  description: 'Sass lang documentation',
  url: 'https://sass-lang.com/documentation/at-rules/use',
};

const ruleBase: RuleBase<DeprecateImportForUseRuleOptions | IsRuleActiveType> = (ruleOptions) => {
  return (root, result) => {
    const ruleSettings = arxService.getRuleSettings<DeprecateImportForUseRuleOptions>(ruleOptions);
    if (!ruleSettings.isRuleActive) {
      return;
    }
    // Check if the file matches the exclusion criteria (skip the rule if it does)
    const isFileToExclude = arxService.isFileMatched(
      root,
      ruleSettings.ruleOptions?.filesToExclude,
    );
    // If the file should be excluded, stop further processing
    if (isFileToExclude) {
      return;
    }

    // Scorre tutte le regole "@import" nel file CSS o Sass
    root.walkAtRules('import', (atRule) => {
      // Genera un report di errore ogni volta che viene trovato un "@import"
      utils.report({
        message: messages.expected,
        node: atRule,
        result,
        ruleName,
      });
    });
  };
};

// Complete the stylelint rule
const rule: Rule = Object.assign(ruleBase, {
  ruleName: ruleName,
  messages: messages,
  meta: meta,
});

export default rule;
