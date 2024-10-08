import minimatch from 'minimatch';

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
 * @property {any} root - root value coming from default rule function
 * @returns {string} Returns the source file path
 */
const getSourceFilePath = (root) => root.source.input.file?.replace(/\\/g, '/');

/**
 * @property {any} root - root value coming from default rule function
 * @property {string[]} files - array of file patterns to check
 * @returns {boolean} Returns if the current file is included in some of the specified paths
 */
const isFileMatched = (root, files) => {
  const sourceFilePath = getSourceFilePath(root);
  return files?.some((pattern) => minimatch(sourceFilePath, `**/${pattern}`));
};

export const arxService = {
  pluginPath,
  namespace,
  extractImportPath,
  isFileMatched,
};