import { utils } from 'stylelint';
import { namespace } from '../utils';

export const ruleName = namespace('no-scss-color-variables');

const possibleTypes = 'Theme|Primary|Secondary|Success|Warning|Danger|Info';

const regexBackground = new RegExp(
  `/\$arx(${possibleTypes})Background(Main|Below|Above|Hover|Selected|Disabled)/g`,
);
const regexColor = new RegExp(
  `/\$arx(${possibleTypes})Color(Highlighted|Ordinary|Hover|Selected|Disabled)/g`,
);

export const messages = utils.ruleMessages(ruleName, {
  rejected: (variable) => `Avoid using SCSS color variable ${variable}, use Mixins instead`,
});

export default function rule(option) {
  return (root, result) => {
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
