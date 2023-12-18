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
import PropTypes from 'prop-types';
import {useIntl, FormattedMessage} from 'react-intl';

import {Modal, Box, Typography, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import '/src/frontend/css/common.css';
import '/src/frontend/css/subComponents/modals.css';

import useItem from '/src/frontend/hooks/useItem';
import Spinner from '/src/frontend/components/Spinner.jsx';

function IsbnIsmnPublisherModal({publisherId, isModalOpen, setIsModalOpen}) {
  const intl = useIntl();
  const undefinedString = intl.formatMessage({id: 'common.noValue'});
  const publisherIdentifiersIsbnString = `${intl.formatMessage({id: 'form.common.publisherIdentifiers'})} (ISBN)`;
  const publisherIdentifiersIsmnString = `${intl.formatMessage({id: 'form.common.publisherIdentifiers'})} (ISMN)`;

  const {data, loading, error} = useItem({
    url: `/api/public/isbn-registry/publishers/${publisherId}`,
    method: 'GET',
    dependencies: [publisherId],
    prefetch: true,
    fetchOnce: false,
    slowDown: 1000
  });

  // Get component based on state
  function getComponent() {
    if (error) {
      return (
        <Typography>
          <FormattedMessage id="error.issn.archive" />
        </Typography>
      );
    }

    if (!data || Object.keys(data).length === 0 || loading) {
      return <Spinner />;
    }

    const formattedPublisherData = formatPublisherData(data);

    return (
      <>
        <IconButton data-test='publisher-modal-close-button' onClick={() => setIsModalOpen(false)} aria-label="close">
          <CloseIcon />
        </IconButton>
        <Typography variant="h2" className="normalTitle">
          <FormattedMessage id="common.publisherDetails.isbn" />
        </Typography>
        <div data-test='publisher-modal-basic-information' className="publisherDetailsContainer">
          <section>
            <h3>
              <FormattedMessage id="form.common.basicInfo" />
            </h3>
            <div>
              <Typography>
                <FormattedMessage id="form.common.name" />:
              </Typography>
              <p data-test='publisher-modal-officialName'>{formattedPublisherData.officialName ?? undefinedString}</p>
            </div>
            <div>
              <Typography>
                <FormattedMessage id="form.common.otherNames" />:
              </Typography>
              <p data-test='publisher-modal-otherNames'>{formattedPublisherData.otherNames ?? undefinedString}</p>
            </div>
            <div>
              <Typography>
                <FormattedMessage id="form.common.previousNames" />:
              </Typography>
              <p data-test='publisher-modal-previousNames'>{formattedPublisherData.previousNames ?? undefinedString}</p>
            </div>
            <div>
              <Typography>
                <FormattedMessage id="form.common.address" />:
              </Typography>
              <p data-test='publisher-modal-address'>{formattedPublisherData.address ?? undefinedString}</p>
            </div>
            <div>
              <Typography>
                <FormattedMessage id="form.common.zip" />:
              </Typography>
              <p data-test='publisher-modal-zip'>{formattedPublisherData.zip ?? undefinedString}</p>
            </div>
            <div>
              <Typography>
                <FormattedMessage id="form.common.city" />:
              </Typography>
              <p data-test='publisher-modal-city'>{formattedPublisherData.city ?? undefinedString}</p>
            </div>
            <div>
              <Typography>
                <FormattedMessage id="form.common.phone" />:
              </Typography>
              <p data-test='publisher-modal-phone'>{formattedPublisherData.phone ?? undefinedString}</p>
            </div>
            <div>
              <Typography>
                <FormattedMessage id="form.common.website" />:
              </Typography>
              <p data-test='publisher-modal-www'>{formattedPublisherData.www && formattedPublisherData.www.length ? formattedPublisherData.www : undefinedString}</p>
            </div>
            {/* If publisher has quitted, display status text */}
            {formattedPublisherData.hasQuitted && <div>
              <Typography>
                <FormattedMessage id="common.status" />:
              </Typography>
              <p>{intl.formatMessage({id: 'publisherRegistry.publisher.publisherHasQuitted'})}</p>
            </div>
            }
          </section>
          <section>
            <h3>
              <FormattedMessage id="common.identifiers" />
            </h3>
            {formattedPublisherData.isbnPublisherIdentifiers && <div data-test='publisher-modal-isbnIdentifiers'>
              <Typography>
                {publisherIdentifiersIsbnString}:
              </Typography>
              <p>{formattedPublisherData.isbnPublisherIdentifiers}</p>
            </div>
            }
            {formattedPublisherData.ismnPublisherIdentifiers && <div data-test='publisher-modal-ismnIdentifiers'>
              <Typography>
                {publisherIdentifiersIsmnString}:
              </Typography>
              <p>{formattedPublisherData.ismnPublisherIdentifiers}</p>
            </div>
            }
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box data-test='publisher-modal' className="publisherModal">{getComponent()}</Box>
      </Modal>
    </>
  );
}

function formatPublisherData(publisherData) {
  return {
    ...publisherData,
    otherNames: transformOtherNames(publisherData.otherNames),
    previousNames: transformPreviousNames(publisherData.previousNames),
    isbnPublisherIdentifiers: transformPublisherIdentifiers(publisherData.isbnSubRanges),
    ismnPublisherIdentifiers: transformPublisherIdentifiers(publisherData.ismnSubRanges)
  };

  function transformOtherNames(otherNames) {
    if (!otherNames || typeof otherNames !== 'string' || otherNames === '') {
      return null;
    }

    return otherNames;
  }

  function transformPreviousNames(previousNames) {
    if (!previousNames || !Array.isArray(previousNames) || previousNames.length === 0) {
      return null;
    }

    return previousNames.join(', ');
  }

  function transformPublisherIdentifiers(publisherIdentifiers) {
    if (!publisherIdentifiers || !Array.isArray(publisherIdentifiers)) {
      return null;
    }

    if (publisherIdentifiers.some(({publisherIdentifier}) => !publisherIdentifier)) {
      return null;
    }

    return publisherIdentifiers
      .map(({publisherIdentifier}) => publisherIdentifier)
      .join(', ');
  }
}

IsbnIsmnPublisherModal.propTypes = {
  publisherId: PropTypes.number.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired
};

export default IsbnIsmnPublisherModal;
