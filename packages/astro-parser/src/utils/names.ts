import { isIdentifierStart, isIdentifierChar } from 'acorn';
import full_char_code_at from './full_char_code_at.js';

export const globals = new Set([
  'alert',
  'Array',
  'Boolean',
  'clearInterval',
  'clearTimeout',
  'confirm',
  'console',
  'Date',
  'decodeURI',
  'decodeURIComponent',
  'document',
  'Element',
  'encodeURI',
  'encodeURIComponent',
  'Error',
  'EvalError',
  'Event',
  'EventSource',
  'fetch',
  'global',
  'globalThis',
  'history',
  'Infinity',
  'InternalError',
  'Intl',
  'isFinite',
  'isNaN',
  'JSON',
  'localStorage',
  'location',
  'Map',
  'Math',
  'NaN',
  'navigator',
  'Number',
  'Node',
  'Object',
  'parseFloat',
  'parseInt',
  'process',
  'Promise',
  'prompt',
  'RangeError',
  'ReferenceError',
  'RegExp',
  'sessionStorage',
  'Set',
  'setInterval',
  'setTimeout',
  'String',
  'SyntaxError',
  'TypeError',
  'undefined',
  'URIError',
  'URL',
  'window',
]);

export const reserved = new Set([
  'arguments',
  'await',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'eval',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'function',
  'if',
  'implements',
  'import',
  'in',
  'instanceof',
  'interface',
  'let',
  'new',
  'null',
  'package',
  'private',
  'protected',
  'public',
  'return',
  'static',
  'super',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'yield',
]);

const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;

/** Is this a void HTML element? */
export function is_void(name: string) {
  return void_element_names.test(name) || name.toLowerCase() === '!doctype';
}

/** Is this a valid HTML element? */
export function is_valid(str: string): boolean {
  let i = 0;

  while (i < str.length) {
    const code = full_char_code_at(str, i);
    if (!(i === 0 ? isIdentifierStart : isIdentifierChar)(code, true)) return false;

    i += code <= 0xffff ? 1 : 2;
  }

  return true;
}

/** Utility to normalize HTML */
export function sanitize(name: string) {
  return name
    .replace(/[^a-zA-Z0-9_]+/g, '_')
    .replace(/^_/, '')
    .replace(/_$/, '')
    .replace(/^[0-9]/, '_$&');
}
