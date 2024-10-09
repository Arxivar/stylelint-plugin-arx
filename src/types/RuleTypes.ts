type BaseRuleOptions = {
  filesToExclude?: string[];
};

export type NoScssColorVariablesRuleOptions = BaseRuleOptions;
export type NoUseMixinsOrPlaceholdersRuleOptions = BaseRuleOptions & {
  mixins?: string[];
  placeholders?: string[];
};
export type NoExplicitStyleKeyRuleOptions = BaseRuleOptions & {
  propsToCheck?: string[];
};

export type AtRuleUseFileNameStartsWithRuleOptions = {
  files?: string[];
  startWith?: string[];
  errorMessage: string;
};
