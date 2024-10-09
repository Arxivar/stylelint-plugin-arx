"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arxService = void 0;
var _minimatch = _interopRequireDefault(require("minimatch"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var prefix = 'plugin-arx';
var pluginPath = './dist/index.js';
var namespace = function namespace(ruleName) {
  return "".concat(prefix, "/").concat(ruleName);
};
var extractImportPath = function extractImportPath(atRule) {
  var splitParams = atRule.params.split(' ');
  var quoteParams = splitParams.filter(function (param) {
    return param.match(/^['"]/);
  });
  var importPath = quoteParams[
  // assume that the string we actually want is the last one
  quoteParams.length - 1];
  if (!importPath) {
    throw new Error("Couldn't find import path from atRule");
  }
  return importPath
  // remove quotes at the beginning of the path
  .replace(/^['"]/, '')
  // remove quotes at the end of the path
  .replace(/['"]$/, '');
};

/**
 * @property root - root value coming from RuleBase rule function
 * @returns {string} Returns the source file path
 */
var getSourceFilePath = function getSourceFilePath(root) {
  var _root$source$input$fi;
  return (_root$source$input$fi = root.source.input.file) === null || _root$source$input$fi === void 0 ? void 0 : _root$source$input$fi.replace(/\\/g, '/');
};

/**
 * @property root - root value coming from RuleBase rule function
 * @property files - array of file patterns to check
 * @returns Returns if the current file is included in some of the specified paths
 */
var isFileMatched = function isFileMatched(root, files) {
  var sourceFilePath = getSourceFilePath(root);
  return files === null || files === void 0 ? void 0 : files.some(function (pattern) {
    return (0, _minimatch["default"])(sourceFilePath, "**/".concat(pattern));
  });
};
var arxService = exports.arxService = {
  pluginPath: pluginPath,
  namespace: namespace,
  extractImportPath: extractImportPath,
  isFileMatched: isFileMatched
};