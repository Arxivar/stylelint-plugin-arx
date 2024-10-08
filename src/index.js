import { createPlugin } from 'stylelint';
import rules from './rules/';
import { arxService } from './arxService';

const rulePluginList = Object.keys(rules).map((ruleName) => {
  return createPlugin(arxService.namespace(ruleName), rules[ruleName]);
});

export default rulePluginList;
