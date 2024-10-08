import { utils } from 'stylelint';
import { arxService } from '../arxService';

export const ruleName = arxService.namespace('no-explicit-style-key');

export const messages = utils.ruleMessages(ruleName, {
  rejected: (variable) => `Avoid using ${variable}, use Mixins instead`,
});

export default function rule(ruleOptions) {
  return (root, result) => {
    // check if file is to exclude
    const isFileToExclude = arxService.isFileMatched(root, ruleOptions?.filesToExclude);

    if (isFileToExclude) {
      return;
    }

    root.walkDecls((style) => {
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
}

rule.ruleName = ruleName;
rule.messages = messages;
