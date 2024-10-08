import { utils, Rule, RuleBase } from 'stylelint';
import { arxService } from '../arxService';
import { IsRuleActiveType, NoScssColorVariablesRuleOptions } from '../types/RuleTypes';

// Define the rule name using a namespace pattern from arxService
const ruleName = arxService.namespace('no-scss-color-variables');
// Define the messages for rule violations
const messages = utils.ruleMessages(ruleName, {
  rejected: (variable) => `Avoid using SCSS color variable ${variable}, use mixins instead`,
});

const ruleBase: RuleBase<NoScssColorVariablesRuleOptions | IsRuleActiveType> = (ruleOptions) => {
  return (root, result) => {
    const ruleSettings = arxService.getRuleSettings<NoScssColorVariablesRuleOptions>(ruleOptions);
    if (!ruleSettings.isRuleActive) {
      return;
    }

    // Check if the file matches the exclusion criteria (skip the rule if it does)
    const isFileToExclude = arxService.isFileMatched(
      root,
      ruleSettings.ruleOptions?.filesToExclude,
    );
    // If the file should be excluded, stop further processing
    if (isFileToExclude) {
      return;
    }

    // Define the possible types of variables that need to be checked
    const possibleTypes = 'Theme|Primary|Secondary|Success|Warning|Danger|Info';

    // Regular expression to detect SCSS background variables
    const regexBackground = new RegExp(
      `\\$arx(${possibleTypes})Background(Main|Below|Above|Hover|Selected|Disabled)\\b`,
      'g',
    );

    // Regular expression to detect SCSS color variables
    const regexColor = new RegExp(
      `\\$arx(${possibleTypes})Color(Highlighted|Ordinary|Hover|Selected|Disabled)\\b`,
      'g',
    );

    // Iterate through each declaration in the stylesheet
    root.walkDecls((style) => {
      // If a style declaration value matches the background or color variable patterns
      if (style.value.match(regexBackground) || style.value.match(regexColor)) {
        // add the error message to show
        utils.report({
          message: messages.rejected(style.value),
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
