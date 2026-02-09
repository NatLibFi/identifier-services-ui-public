import fs from 'fs';

/**
 * Formatting function for reading boolean environment variable values.
 * Originally from: https://github.com/NatLibFi/melinda-commons-js/blob/73e975a6b664c77aeb872f0a443fc04af4f2b3d0/src/utils.js#L31
 * License: https://github.com/NatLibFi/melinda-commons-js/blob/73e975a6b664c77aeb872f0a443fc04af4f2b3d0/LICENSE.txt (MIT)
 * Copyright (c) 2018-present University Of Helsinki (The National Library Of Finland)
 * @param {string} value - value to evaluate boolean value from
 * @returns {boolean} true if value was evaluated as true, otherwise false
 */
export function parseBoolean(value) {
  if (value === undefined) {
    return false;
  }

  if (Number.isNaN(Number(value))) {
    return value.length > 0 && !/^(?:false)$/iu.test(value);
  }

  return Boolean(Number(value));
}

/**
 * Read file given the filepath. Used for loading API client certificates.
 * @param {string|null|undefined} path - path to read file content from
 * @returns {string}
 */
export function parseFile(path) {
  if (!path || path === '') {
    return false;
  }

  if (fs.existsSync(path)) {
    return fs.readFileSync(path, 'utf8');
  }

  throw new Error(`Could not read file from path ${path}`);
}

/**
 * @typedef ReadEnvironmentVariableOptions
 * @property {*} [defaultValue] - default value to use if variable is not defined in env
 * @property {boolean} [hideDefault] - whether to hide default value from logging or not
 * @property {function} [format] - function to use for formatting the value
 */

/**
 * Read environment variable value and format it if formatter function is defined.
 * Originally from: https://github.com/NatLibFi/melinda-backend-commons-js/blob/14aa7cc574ac99d551e64add0655ec0eed619885/src/utils.js#L10
 * License: https://github.com/NatLibFi/melinda-backend-commons-js/blob/14aa7cc574ac99d551e64add0655ec0eed619885/LICENSE.txt (MIT)
 * Copyright (c) 2022-present University Of Helsinki (The National Library Of Finland)
 * @param {string} name - name of environmental variable to read
 * @param {ReadEnvironmentVariableOptions} opts - options for processing the envirnoment variable
 * @returns {*} returns read value (or default value if defined and read value was not found) that has been run through formatting function if one was defined
 */
export function readEnvironmentVariable(name, opts = {}) {
  const envValue = process.env[name];
  const { defaultValue, hideDefault = false, format = (v) => v } = opts;

  if (envValue === undefined) {
    if (defaultValue === undefined) {
      throw new Error(`Mandatory environment variable missing: ${name}`);
    }

    const defaultValuePrintable = typeof defaultValue === 'object' ? JSON.stringify(defaultValue) : defaultValue;

    // Silence warnings regarding default values during automated tests
    if (process.env.NODE_ENV !== 'test') {
      console.error(
        `No environment variable set for ${name}, using default value: ${
          hideDefault ? '[hidden]' : defaultValuePrintable
        }`,
      );
    }

    return defaultValue;
  }

  return format(envValue);
}

/**
 * In case of providing a configuration as any other than plain NAME=value format, it needs to be defined within single-quotes.
 * This however breaks values when using local docker --env-file loader not supporting anything else than plain NAME=value format.
 * See more at:
 * - https://github.com/docker/cli/issues/3630
 * - https://github.com/docker/cli/issues/3630#issuecomment-1852361482
 * @param {string} value - JSON as string
 * @param {boolean} json - whether to apply JSON.parse
 */
export function parseSingleQuotedValue(value, json = true) {
  const withoutWrappingSingleQuotesStart = value.replace(/^'/, '');
  const withoutWrappingSingleQuotes = withoutWrappingSingleQuotesStart.replace(/'$/, '');

  if (json) {
    const parsed = JSON.parse(withoutWrappingSingleQuotes);
    return parsed;
  }

  return withoutWrappingSingleQuotes;
}

export function isDevelopmentEnvironment() {
  return process.env.NODE_ENV === 'development';
}

export function isProductionEnvironment() {
  return process.env.NODE_ENV === 'production';
}
