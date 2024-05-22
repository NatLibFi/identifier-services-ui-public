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

import React from 'react';
import {FormattedMessage} from 'react-intl';

import useDocumentTitle from '/src/frontend/hooks/useDocumentTitle';

import '/src/frontend/css/privacyPolicy.css';

function PrivacyPolicy() {
  useDocumentTitle('privacyPolicy.title');

  const parts = [
    '1a',
    '1b',
    ...Array.from({length: 13}, (x, i) => `${i + 2}`) // '2' ... '14'
  ];

  // Part 5 contains multiple sub-headings
  const part5Configuration = {
    'publisherInformation': [
      'language',
      'name',
      'contactPersonInfo',
      'address',
      'otherNames',
      'publisherIdentifier',
      'additionalInformation',
      'publisherClassification'
    ],
    'publicationInformation': [
      'publisherName',
      'publisherEmail',
      'publisherAddress',
      'publisherContactPerson',
      'publisherPhone',
      'authorInformation'
    ],
    'superuserInformation': [
      'name',
      'username',
      'password',
      'personalSettings',
      'email'
    ],
    'personalization': [
      'settings'
    ],
    'other': [
      'mandatoryInfo',
      'errorAndMisconductInfo'
    ]
  };

  return (
    <div className="privacyPolicy">
      <h2>
        <FormattedMessage id="privacyPolicy.title" />
      </h2>

      {parts.map(part => (
        <div key={part}>
          <h3><FormattedMessage id={`privacyPolicy.${part}.title`} /></h3>
          {/* Part 1a content is shared between languages */}
          {part === '1a' && (
            <div>
              Kansalliskirjasto<br />
              Kirjastoverkkopalvelut<br />
              PL 15 (Unioninkatu 26)<br />
              00014 Helsingin yliopisto<br />
              P. 02941 911
            </div>
          )}


          {/* Part 5 and 11 have different structure than other parts */}
          {part === '5' && (
            <div>
              <p><FormattedMessage id={'privacyPolicy.5.prefix'} /></p>
              {Object.keys(part5Configuration).map(key => (
                <div key={key}>
                  <b><FormattedMessage id={`privacyPolicy.5.${key}`} /></b>
                  <ul>
                    {part5Configuration[key].map(info => (<li key={info}><FormattedMessage id={`privacyPolicy.5.${key}.${info}`} /></li>))}
                  </ul>
                </div>
              ))}
              <p><FormattedMessage id={'privacyPolicy.5.suffix'} /></p>
            </div>
          )}

          {part === '11' && (
            ['1', '2', '3'].map(key => (
              <div className='privacyPolicyContent' key={key}>
                <b><FormattedMessage id={`privacyPolicy.11.part${key}.boldContent`} /></b>
                <p><FormattedMessage id={`privacyPolicy.11.part${key}.content`} /></p>
              </div>
            ))
          )}

          {!['1a', '5', '11'].includes(part) && (
            <div className='privacyPolicyContent'><FormattedMessage id={`privacyPolicy.${part}.content`} /></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PrivacyPolicy;
