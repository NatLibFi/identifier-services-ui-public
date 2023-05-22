/**
 *
 * @licstart  The following is the entire license notice for the JavaScript code in this file.
 *
 * Public UI service of Identifier Services system
 *
 * Copyright (C) 2023 University Of Helsinki (The National Library Of Finland)
 *
 * This file is part of identifier-services-ui-public
 *
 * identifier-services-ui-public program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * identifier-services-ui-public is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this file.
 *
 */

import {PUBLISHER_LANGUAGES} from './constants';

export function formatLanguage(lang) {
  // If language is not defined, use Finnish as default
  if (!lang || PUBLISHER_LANGUAGES[lang] === undefined) {
    return PUBLISHER_LANGUAGES.fi;
  }

  return PUBLISHER_LANGUAGES[lang];
}

export function translateOptions(options, intl) {
  return options ? options.map(option => {
    // Empty values should not be translated
    if (option.label) {
      return {
        label: intl.formatMessage({id: `${option.label}`}),
        value: option.value
      };
    }

    return option;
  }) : [];
}
