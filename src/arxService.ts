import minimatch from 'minimatch';
import { Root } from 'postcss';

const prefix = 'plugin-arx';

const pluginPath = './dist/index.js';

const namespace = (ruleName) => `${prefix}/${ruleName}`;

const extractImportPath = (atRule) => {
  const splitParams = atRule.params.split(' ');
  const quoteParams = splitParams.filter((param) => param.match(/^['"]/));

  const importPath =
    quoteParams[
      // assume that the string we actually want is the last one
      quoteParams.length - 1
    ];

  if (!importPath) {
    throw new Error(`Couldn't find import path from atRule`);
  }

  return (
    importPath
      // remove quotes at the beginning of the path
      .replace(/^['"]/, '')
      // remove quotes at the end of the path
      .replace(/['"]$/, '')
  );
};

/**
 * @property root - root value coming from RuleBase rule function
 * @returns {string} Returns the source file path
 */
const getSourceFilePath = (root: Root): string => root.source.input.file?.replace(/\\/g, '/');

/**
 * @property root - root value coming from RuleBase rule function
 * @property files - array of file patterns to check
 * @returns Returns if the current file is included in some of the specified paths
 */
const isFileMatched = (root: Root, files: string[]): boolean => {
  const sourceFilePath = getSourceFilePath(root);
  return files?.some((pattern) => minimatch(sourceFilePath, `**/${pattern}`));
};

export const arxService = {
  pluginPath,
  namespace,
  extractImportPath,
  isFileMatched,
};
