import { utils } from 'stylelint';
import { namespace } from '../utils';
import minimatch from 'minimatch';

export const ruleName = namespace('no-explicit-style-key');

export const messages = utils.ruleMessages(ruleName, {
  rejected: (variable) => `Avoid using ${variable}, use Mixins instead`,
});

export default function rule(ruleOptions) {
  return (root, result) => {
    const sourceFilePath = root.source.input.file?.replace(/\\/g, '/');
    root.walkDecls((style) => {
      const isFileToExclude = ruleOptions?.filesToExclude?.some((pattern) =>
        minimatch(sourceFilePath, `**/${pattern}`),
      );

      if (isFileToExclude) {
        return;
      }

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
