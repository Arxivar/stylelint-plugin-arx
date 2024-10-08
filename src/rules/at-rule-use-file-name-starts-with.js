import { utils } from 'stylelint';
import { arxService } from '../arxService';

const modes = {
  REQUIRED: 'required',
  BLOCK: 'block',
};

export const ruleName = arxService.namespace('at-rule-use-file-name-starts-with');

export const messages = utils.ruleMessages(ruleName, {
  expected: (errorMessage) => errorMessage,
});

export default function rule(ruleOptions) {
  return (root, result) => {
    // try to match a rule
    const matchedRule = ruleOptions.filter((rule) =>
      arxService.isFileMatched(root, rule.files),
    )?.[0];

    if (!matchedRule) {
      return;
    }

    root.walkAtRules('use', (atRule) => {
      const atRuleFilePath = arxService.extractImportPath(atRule);
      let startsWithMatchList = [];

      if (Array.isArray(matchedRule.startWith)) {
        startsWithMatchList = matchedRule.startWith;
      } else {
        startsWithMatchList = [matchedRule.startWith];
      }

      if (matchedRule.mode === modes.BLOCK) {
        startsWithMatchList.forEach((startWithString) => {
          if (atRuleFilePath.startsWith(startWithString)) {
            utils.report({
              message: messages.expected(matchedRule.errorMessage),
              node: atRule,
              result,
              ruleName,
            });
          }
        });
      } else if (matchedRule.mode.REQUIRED) {
      }
    });
  };
}

rule.primaryOptionArray = true;
rule.ruleName = ruleName;
rule.messages = messages;
