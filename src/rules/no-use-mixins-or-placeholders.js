import { utils } from 'stylelint';
import { namespace } from '../utils';
import minimatch from 'minimatch';

export const ruleName = namespace('no-use-mixins-or-placeholders');

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
    const sourceFilePath = root.source.input.file?.replace(/\\/g, '/');
    root.walkAtRules('include', (atRule) => {
      const isFileToExclude = ruleOptions?.filesToExclude?.some((pattern) =>
        minimatch(sourceFilePath, `**/${pattern}`),
      );

      if (isFileToExclude) {
        return;
      }

      const mixins = ruleOptions.mixins;
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
      const isFileToExclude = ruleOptions?.filesToExclude?.some((pattern) =>
        minimatch(sourceFilePath, `**/${pattern}`),
      );

      if (isFileToExclude) {
        return;
      }

      const placeholders = ruleOptions.placeholders;

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
