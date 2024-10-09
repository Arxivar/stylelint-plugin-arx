import { Rule, RuleBase, utils } from 'stylelint';
import { arxService } from '../arxService';
import { IsRuleActiveType, NoDotPrefixImportRuleRuleOptions } from '../types/RuleTypes';

// Define the rule name using a namespace pattern from arxService
const ruleName = arxService.namespace('no-dot-prefix-import-rule');
// Define the messages for rule violations
const messages = utils.ruleMessages(ruleName, {
  expected: 'Import path should not start with dot',
});

const ruleBase: RuleBase<NoDotPrefixImportRuleRuleOptions | IsRuleActiveType> = (ruleOptions) => {
  return (root, result) => {
    const ruleSettings = arxService.getRuleSettings<NoDotPrefixImportRuleRuleOptions>(ruleOptions);
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

    ['use', 'import'].forEach((rule) => {
      root.walkAtRules(rule, (atRule) => {
        // Verifica se il percorso dell'importazione (estratto da arxService) inizia con un punto ('.')
        // Un percorso che inizia con '.' rappresenta un percorso relativo.
        if (arxService.extractImportPath(atRule).startsWith('.')) {
          // Se il percorso inizia con '.', genera un report di violazione
          utils.report({
            message: messages.expected,
            node: atRule,
            result,
            ruleName,
          });
        }
      });
    });
  };
};

// Complete the stylelint rule
const rule: Rule = Object.assign(ruleBase, {
  ruleName: ruleName,
  messages: messages,
});

export default rule;
