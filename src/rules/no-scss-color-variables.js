import { utils } from 'stylelint';
import { arxService } from '../arxService';

export const ruleName = arxService.namespace('no-scss-color-variables');

const possibleTypes = 'Theme|Primary|Secondary|Success|Warning|Danger|Info';

const regexBackground = new RegExp(
  `/\$arx(${possibleTypes})Background(Main|Below|Above|Hover|Selected|Disabled)/g`,
);
const regexColor = new RegExp(
  `/\$arx(${possibleTypes})Color(Highlighted|Ordinary|Hover|Selected|Disabled)/g`,
);

export const messages = utils.ruleMessages(ruleName, {
  rejected: (variable) => `Avoid using SCSS color variable ${variable}, use mixins instead`,
});

export default function rule(ruleOptions) {
  return (root, result) => {
    // check if file is to exclude
    const isFileToExclude = arxService.isFileMatched(root, ruleOptions?.filesToExclude);

    if (isFileToExclude) {
      return;
    }

    root.walkDecls((style) => {
      if (style.value.match(regexBackground) || style.value.match(regexColor)) {
        utils.report({
          message: messages.rejected(style.value),
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
