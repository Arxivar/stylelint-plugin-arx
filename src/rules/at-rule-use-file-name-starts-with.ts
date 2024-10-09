import { Rule, RuleBase, utils } from 'stylelint';
import { arxService } from '../arxService';
import {
  AtRuleUseFileNameStartsWithMode,
  AtRuleUseFileNameStartsWithRuleOptions,
} from '../types/RuleTypes';
import _ from 'lodash';

// Define the rule name using a namespace pattern from arxService
const ruleName = arxService.namespace('at-rule-use-file-name-starts-with');
// Define the messages for rule violations
const messages = utils.ruleMessages(ruleName, {
  expected: (errorMessage: string) => errorMessage,
});

const ruleBase: RuleBase<AtRuleUseFileNameStartsWithRuleOptions> = (ruleOptions) => {
  return (root, result) => {
    // try to match a rule
    const matchedRule = _.filter(ruleOptions, (rule) =>
      arxService.isFileMatched(root, rule.files),
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

      if (matchedRule.mode === AtRuleUseFileNameStartsWithMode.BLOCK) {
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
      } else if (matchedRule.mode.REQUIRED) {
      }
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
