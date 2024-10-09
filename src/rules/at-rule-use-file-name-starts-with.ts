import { Rule, RuleBase, utils } from 'stylelint';
import { arxService } from '../arxService';
import { AtRuleUseFileNameStartsWithRuleOptions, IsRuleActiveType } from '../types/RuleTypes';

// Define the rule name using a namespace pattern from arxService
const ruleName = arxService.namespace('at-rule-use-file-name-starts-with');
// Define the messages for rule violations
const messages = utils.ruleMessages(ruleName, {
  expected: (errorMessage: string) => errorMessage,
});
const hasValidRuleOptions = (
  ruleOptions: any,
): ruleOptions is AtRuleUseFileNameStartsWithRuleOptions[] => {
  return Array.isArray(ruleOptions) && ruleOptions?.length > 0;
};

const ruleBase: RuleBase<AtRuleUseFileNameStartsWithRuleOptions[]> = (ruleOptions) => {
  return (root, result) => {
    if (!hasValidRuleOptions(ruleOptions)) {
      return;
    }

    // get the first ruleOptions object where the file is included
    const matchedRule = ruleOptions?.filter((rule) =>
      arxService.isFileMatched(root, rule?.files),
    )?.[0];

    if (!matchedRule) {
      return;
    }

    root.walkAtRules('use', (atRule) => {
      const atRuleFilePath = arxService.extractImportPath(atRule);
      let startsWithMatchList = [];

      // Verifica se la regola startWith è un array, altrimenti la trasforma in un array
      if (Array.isArray(matchedRule.startWith)) {
        startsWithMatchList = matchedRule.startWith;
      } else {
        startsWithMatchList = [matchedRule.startWith];
      }

      startsWithMatchList.forEach((startWithString) => {
        if (atRuleFilePath.startsWith(startWithString)) {
          // Se il file importato inizia con una delle stringhe bloccate, genera un avviso
          utils.report({
            message: messages.expected(matchedRule.errorMessage),
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
  primaryOptionArray: true,
});

export default rule;
