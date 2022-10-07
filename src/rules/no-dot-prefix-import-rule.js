import { utils } from 'stylelint';
import { namespace, extractImportPath } from '../utils';

export const ruleName = namespace('no-dot-prefix-import-rule');

export const messages = utils.ruleMessages(ruleName, {
  expected: 'Import path should not start with dot',
});

export default function rule(allowedAliasList) {
  return (root, result) => {
    ['use', 'import'].forEach(rule => {
      root.walkAtRules(rule, (atRule) => {
        if (extractImportPath(atRule).startsWith('.')) {
          utils.report({
            message: messages.expected,
            node: atRule, 
            result, 
            ruleName, 
          })
        }
      })
    })
  };
}

rule.ruleName = ruleName;
rule.messages = messages;