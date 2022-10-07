const prefix = 'plugin-arx';

export const pluginPath = './dist/index.js';

export const namespace = (ruleName) => `${prefix}/${ruleName}`;

export const extractImportPath = (atRule) => {
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
