import { utils } from 'stylelint';
import { arxService } from '../arxService';

export const ruleName = arxService.namespace('no-use-mixins-or-placeholders');

export const messages = utils.ruleMessages(ruleName, {
  rejectedMixin: (value) => `Avoid using this mixin  ${value}`,
  rejectedPlaceholder: (value) => `Avoid using this placeholder ${value}`,
});

const regexMixin = (mixins) => {
  if (mixins?.length > 0) {
    const _mixins = mixins.join('|');
    return new RegExp(`.*\\.(${_mixins})\\b$`, 'g');
  }
  return undefined;
};

const regexPlaceholder = (placeholders) => {
  if (placeholders?.length > 0) {
    const _placeholders = placeholders.join('|');
    return new RegExp(`%(${_placeholders})\\b$`);
  }
  return undefined;
};

export default function rule(ruleOptions) {
  return (root, result) => {
    // check if file is to exclude
    const isFileToExclude = arxService.isFileMatched(root, ruleOptions?.filesToExclude);

    if (isFileToExclude) {
      return;
    }

    root.walkAtRules('include', (atRule) => {
      const mixins = ruleOptions?.mixins;
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
      const placeholders = ruleOptions?.placeholders;

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
}

rule.ruleName = ruleName;
rule.messages = messages;
