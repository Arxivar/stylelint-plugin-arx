import { utils } from 'stylelint';
import { namespace } from '../utils';

export const ruleName = namespace('deprecate-import-for-use');

export const messages = utils.ruleMessages(ruleName, {
  expected: "'@import' is deprecated. Instead use '@use'"
});

export const meta = {
  description: 'Sass lang documentation',
  url: 'https://sass-lang.com/documentation/at-rules/use'
}

export default function rule(option) {
  return (root, result) => {
    const validOptions = utils.validateOptions(result, ruleName, {
      actual: option,
    });

    if (!validOptions) {
      return;
    }

    root.walkAtRules('import', (atRule) => {
      utils.report({
        message: messages.expected,
        node: atRule,
        result,
        ruleName,
      });
    });
  };
}

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;