import { createPlugin } from 'stylelint';
import rules from './rules/';
import { namespace } from './utils';

const rulePluginList = Object.keys(rules).map((ruleName) => {
  return createPlugin(namespace(ruleName), rules[ruleName]);
});

export default rulePluginList;
