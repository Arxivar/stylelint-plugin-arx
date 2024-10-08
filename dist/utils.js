"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pluginPath = exports.namespace = exports.extractImportPath = void 0;
var prefix = 'plugin-arx';
var pluginPath = exports.pluginPath = './dist/index.js';
var namespace = exports.namespace = function namespace(ruleName) {
  return "".concat(prefix, "/").concat(ruleName);
};
var extractImportPath = exports.extractImportPath = function extractImportPath(atRule) {
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