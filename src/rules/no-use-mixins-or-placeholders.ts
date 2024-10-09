import { Rule, RuleBase, utils } from 'stylelint';
import { arxService } from '../arxService';
import { IsRuleActiveType, NoUseMixinsOrPlaceholdersRuleOptions } from '../types/RuleTypes';

// Define the rule name using a namespace pattern from arxService
const ruleName = arxService.namespace('no-use-mixins-or-placeholders');

// Define the messages for rule violations
const messages = utils.ruleMessages(ruleName, {
  rejectedMixin: (value) => `Avoid using this mixin  ${value}`,
  rejectedPlaceholder: (value) => `Avoid using this placeholder ${value}`,
});

// Helper function to create a regex to match mixins
const regexMixin = (mixins: string[]) => {
  if (mixins?.length > 0) {
    const _mixins = mixins.join('|');
    return new RegExp(`.*\\.(${_mixins})\\b$`, 'g');
  }
  return undefined;
};

// Helper function to create a regex to match placeholders
const regexPlaceholder = (placeholders: string[]) => {
  if (placeholders?.length > 0) {
    const _placeholders = placeholders.join('|');
    return new RegExp(`%(${_placeholders})\\b$`);
  }
  return undefined;
};

const ruleBase: RuleBase<NoUseMixinsOrPlaceholdersRuleOptions | IsRuleActiveType> = (
  ruleOptions,
) => {
  return (root, result) => {
    const ruleSettings =
      arxService.getRuleSettings<NoUseMixinsOrPlaceholdersRuleOptions>(ruleOptions);
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

    root.walkAtRules('include', (atRule) => {
      const mixins = ruleSettings.ruleOptions?.mixins;
      const resultRegexMixin = regexMixin(mixins);

      // Cerca il mixin specifico
      if (resultRegexMixin && atRule.params.match(resultRegexMixin)) {
        utils.report({
          message: messages.rejectedMixin(atRule.params),
          node: atRule,
          result,
          ruleName,
        });
      }
    });

    root.walkAtRules('extend', (atRule) => {
      const placeholders = ruleSettings.ruleOptions?.placeholders;

      const resultRegexPlaceholders = regexPlaceholder(placeholders);

      // Cerca il placeholder specifico
      if (resultRegexPlaceholders && atRule.params.match(resultRegexPlaceholders)) {
        utils.report({
          message: messages.rejectedPlaceholder(atRule.params),
          node: atRule,
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
