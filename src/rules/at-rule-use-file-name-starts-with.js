import minimatch from 'minimatch';
import { utils } from 'stylelint';
import { namespace, extractImportPath } from '../utils';

const modes = {
  REQUIRED: 'required',
  BLOCK: 'block',
};

export const ruleName = namespace('at-rule-use-file-name-starts-with');

export const messages = utils.ruleMessages(ruleName, {
  expected: errorMessage => errorMessage
});

export default function rule(ruleOptions) {
  return (root, result) => {
    const sourceFilePath = root.source.input.file?.replace(/\\/g, '/');

    // try to match a rule
    const matchedRule = ruleOptions.filter((rule) =>
      rule.files.some((pattern) => minimatch(sourceFilePath, `**/${pattern}`)),
    )?.[0];

    if (!matchedRule) {
      return;
    }

    root.walkAtRules('use', (atRule) => {
      const atRuleFilePath = extractImportPath(atRule);
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
