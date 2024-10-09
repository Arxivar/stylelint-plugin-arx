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

export const AtRuleUseFileNameStartsWithMode = {
  REQUIRED: 'required',
  BLOCK: 'block',
};

export type AtRuleUseFileNameStartsWithRuleOptions = {
  files?: string[];
  mode?: typeof AtRuleUseFileNameStartsWithMode;
  startWith?: string[];
  errorMessage: string;
};
