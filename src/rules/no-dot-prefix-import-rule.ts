import { Rule, RuleBase, utils } from 'stylelint';
import { arxService } from '../arxService';

// Define the rule name using a namespace pattern from arxService
const ruleName = arxService.namespace('no-dot-prefix-import-rule');
// Define the messages for rule violations
const messages = utils.ruleMessages(ruleName, {
  expected: 'Import path should not start with dot',
});

const ruleBase: RuleBase = () => {
  return (root, result) => {
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
