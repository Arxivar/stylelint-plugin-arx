import { Rule, RuleBase, utils } from 'stylelint';
import { arxService } from '../arxService';
import { IsRuleActiveType, NoExplicitStylePropRuleOptions } from '../types/RuleTypes';

// Define the rule name using a namespace pattern from arxService
const ruleName = arxService.namespace('no-explicit-style-prop');
// Define the messages for rule violations
const messages = utils.ruleMessages(ruleName, {
  rejected: (prop) => `Do not set the prop ${prop} directly`,
});

const ruleBase: RuleBase<NoExplicitStylePropRuleOptions | IsRuleActiveType> = (ruleOptions) => {
  return (root, result) => {
    const ruleSettings = arxService.getRuleSettings<NoExplicitStylePropRuleOptions>(ruleOptions);
    if (!ruleSettings.isRuleActive) {
      return;
    }

    // check if file is to exclude
    const isFileToExclude = arxService.isFileMatched(
      root,
      ruleSettings.ruleOptions?.filesToExclude,
    );

    if (isFileToExclude) {
      return;
    }

    root.walkDecls((style) => {
      // Check if the style property is to lock
      if (ruleSettings.ruleOptions?.propsToLock?.includes(style.prop)) {
        // add the error message to show
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
