import { Rule, RuleBase, utils } from 'stylelint';
import { arxService } from '../arxService';
import { NoExplicitStyleKeyRuleOptions } from '../types/RuleTypes';

// Define the rule name using a namespace pattern from arxService
const ruleName = arxService.namespace('no-explicit-style-key');
// Define the messages for rule violations
const messages = utils.ruleMessages(ruleName, {
  rejected: (variable) => `Avoid using ${variable}, use Mixins instead`,
});

const ruleBase: RuleBase<NoExplicitStyleKeyRuleOptions> = (ruleOptions) => {
  return (root, result) => {
    // check if file is to exclude
    const isFileToExclude = arxService.isFileMatched(root, ruleOptions?.filesToExclude);

    if (isFileToExclude) {
      return;
    }

    root.walkDecls((style) => {
      // If the property is in the propsToCheck list, report it
      if (ruleOptions?.propsToCheck?.includes(style.prop)) {
        utils.report({
          message: messages.rejected(style.prop),
          node: style,
          result,
          ruleName,
        });
      }
    });
  };
};

// Complete the stylelint rule
const rule: Rule = Object.assign(ruleBase, {
  ruleName: ruleName,
  messages: messages,
});

export default rule;
