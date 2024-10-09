type BaseRuleOptions = {
  filesToExclude?: string[];
};
export type IsRuleActiveType = boolean;
export type DeprecateImportForUseRuleOptions = BaseRuleOptions;
export type NoDotPrefixImportRuleRuleOptions = BaseRuleOptions;
export type NoScssColorVariablesRuleOptions = BaseRuleOptions;
export type NoUseMixinsOrPlaceholdersRuleOptions = BaseRuleOptions & {
  mixins?: string[];
  placeholders?: string[];
};
export type NoExplicitStylePropRuleOptions = BaseRuleOptions & {
  propsToLock?: string[];
};

export type AtRuleUseFileNameStartsWithRuleOptions = {
  files?: string[];
  startWith?: string[];
  errorMessage: string;
};
