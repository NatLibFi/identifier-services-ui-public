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
import PropTypes from 'prop-types';
import {Typography} from '@mui/material';

import '/src/frontend/css/common.css';

import ListComponent from '/src/frontend/components/ListComponent.jsx';
import AuthorCard from '/src/frontend/components/subComponents/AuthorCard.jsx';
import {PUBLICATION_TYPES, PUBLISHING_ACTIVITIES_TYPE} from '../constants';

function Preview({values, intl}) {
  const isDissertation = values.publicationType === PUBLICATION_TYPES.DISSERTATION;

  return (
    <>
      <div data-test='isbn-form-preview' className="mainContainer">
        {/* Kustantajan tiedot - Publisher details*/}
        <div className="listComponentContainer">
          <Typography variant="h3" className="listComponentContainerHeader">
            <FormattedMessage
              id={
                isDissertation
                  ? 'common.contactDetails'
                  : 'form.isbnIsmn.preview.publisherDetails'
              }
            />
          </Typography>
          {!isDissertation && (
            <>
              <ListComponent
                fieldName="officialName"
                label={<FormattedMessage id="form.common.name" />}
                value={values.officialName}
              />
              {values.publisherIdentifierStr ? (
                <ListComponent
                  fieldName="publisherIdentifierStr"
                  label={<FormattedMessage id="form.common.publisherIdentifier" />}
                  value={values.publisherIdentifierStr}
                />
              ) : null}
            </>
          )}
          <ListComponent
            fieldName="address"
            label={<FormattedMessage id="form.common.address" />}
            value={values.address}
          />
          <ListComponent
            fieldName="zip"
            label={<FormattedMessage id="form.common.zip" />}
            value={values.zip}
          />
          <ListComponent
            fieldName="city"
            label={<FormattedMessage id="form.common.city" />}
            value={values.city}
          />
          {isDissertation && (
            <ListComponent
              fieldName="universityName"
              label={<FormattedMessage id="form.isbnIsmn.preview.universityName" />}
              value={<FormattedMessage id="form.isbnIsmn.preview.helsinki" />}
            />
          )}
          <ListComponent
            fieldName="contactPerson"
            label={<FormattedMessage id="form.common.contactPerson" />}
            value={values.contactPerson}
          />
          <ListComponent
            fieldName="phone"
            label={<FormattedMessage id="form.common.phone" />}
            value={values.phone}
          />
          <ListComponent
            fieldName="email"
            label={<FormattedMessage id="form.common.email" />}
            value={values.email}
          />
        </div>

        {/* Julkaisun perustiedot - Publication basic information*/}
        <div className="listComponentContainer">
          <Typography variant="h3" className="listComponentContainerHeader">
            <FormattedMessage id="form.isbnIsmn.preview.publicationInfo" />
          </Typography>
          <ListComponent
            fieldName="title"
            label={<FormattedMessage id="form.common.title" />}
            value={values.title}
          />
          {values.subtitle ? (
            <ListComponent
              fieldName="subtitle"
              label={<FormattedMessage id="form.common.subtitle" />}
              value={values.subtitle}
            />
          ) : null}
          <ListComponent
            fieldName="month"
            label={<FormattedMessage id="form.common.publicationMonth" />}
            value={intl.formatMessage({id: `common.month.${values.publicationMonth}`})}
          />
          <ListComponent
            fieldName="year"
            label={<FormattedMessage id="form.common.publicationYear" />}
            value={values.publicationYear}
          />
          <ListComponent
            fieldName="language"
            label={<FormattedMessage id="form.common.language" />}
            value={intl.formatMessage({id: `common.${values.language.toLowerCase()}`})}
          />
        </div>

        {/* Julkaisutoiminta - Publishing activities*/}
        {!isDissertation && (
          <div className="listComponentContainer">
            <Typography variant="h3" className="listComponentContainerHeader">
              <FormattedMessage id="form.common.publishingActivities" />
            </Typography>
            <ListComponent
              fieldName="publishedBefore"
              label={<FormattedMessage id="form.isbnIsmn.preview.previouslyPublished" />}
              value={intl.formatMessage({id: `common.${values.publishedBefore}`})}
            />
            <ListComponent
              fieldName="publishingActivity"
              label={<FormattedMessage id="form.common.publishingActivities" />}
              value={
                values.publishingActivity === PUBLISHING_ACTIVITIES_TYPE.OCCASIONAL ? (
                  <FormattedMessage id="form.isbnIsmn.publishingActivities.option.occasional" />
                ) : (
                  <FormattedMessage id="form.isbnIsmn.publishingActivities.option.continuous" />
                )
              }
            />
            <ListComponent
              fieldName="publishingActivityAmount"
              label={<FormattedMessage id="form.isbnIsmn.preview.thisYear" />}
              value={values.publishingActivityAmount}
            />
          </div>
        )}

        {/* Julkaisumuoto - Format details*/}
        <div className="listComponentContainer">
          <Typography variant="h3" className="listComponentContainerHeader">
            <FormattedMessage id="form.isbnIsmn.preview.formatDetails" />
          </Typography>
          <ListComponent
            fieldName="publicationFormat"
            label={<FormattedMessage id="form.isbnIsmn.preview.format" />}
            value={intl.formatMessage({
              id: `form.isbnIsmn.format.option.${values.publicationFormat?.toLowerCase()}`
            })}
          />
          {/* Printed book */}
          {values.type && (
            <ListComponent
              fieldName="type"
              label={<FormattedMessage id="form.isbnIsmn.preview.printFormat" />}
              value={values.type.map((v) => v.value)}
            />
          )}
          {values.typeOther && (
            <ListComponent
              fieldName="typeOther"
              label={<FormattedMessage id="form.isbnIsmn.preview.printFormatOther" />}
              value={values.typeOther}
            />
          )}
          {values.printingHouse && (
            <ListComponent
              fieldName="printingHouse"
              label={<FormattedMessage id="form.isbnIsmn.preview.manufacturer" />}
              value={values.printingHouse}
            />
          )}
          {values.printingHouseCity && (
            <ListComponent
              fieldName="printingHouseCity"
              label={<FormattedMessage id="form.isbnIsmn.preview.city" />}
              value={values.printingHouseCity}
            />
          )}
          {values.edition && (
            <ListComponent
              fieldName="edition"
              label={<FormattedMessage id="form.isbnIsmn.preview.edition" />}
              value={`${values.edition}.`}
            />
          )}
          {values.copies && (
            <ListComponent
              fieldName="copies"
              label={<FormattedMessage id="form.isbnIsmn.preview.run" />}
              value={values.copies}
            />
          )}
          {/* Electronic book */}
          {values.fileformat && (
            <ListComponent
              fieldName="fileformat"
              label={<FormattedMessage id="form.isbnIsmn.preview.fileFormat" />}
              value={values.fileformat.map((v) => v.value)}
            />
          )}
          {values.fileformatOther && (
            <ListComponent
              fieldName="fileformatOther"
              label={<FormattedMessage id="form.isbnIsmn.preview.fileformatOther" />}
              value={values.fileformatOther}
            />
          )}
        </div>

        {/* Lisätiedot - Additional details*/}
        {values.comments && (
          <div className="listComponentContainer listComponentAdditionalDetails">
            <Typography variant="h3" className="listComponentContainerHeader">
              <FormattedMessage id="form.isbnIsmn.preview.additionalDetails" />
            </Typography>
            <ListComponent fieldName="comments" value={values.comments} />
          </div>
        )}

        {/* Tekijät - Authors*/}
        <div className="listComponentContainer listComponentAuthors" data-dissertation={isDissertation}>
          <Typography variant="h3" className="listComponentContainerHeader">
            <FormattedMessage id="form.isbnIsmn.preview.authors" />
          </Typography>
          <AuthorCard authors={values.authors} />
        </div>

        {/* Sarjan tiedot - Series details*/}
        {values.series && (
          <div className="listComponentContainer listComponentSeriesDetails">
            <Typography variant="h3" className="listComponentContainerHeader">
              <FormattedMessage id="form.isbnIsmn.preview.seriesDetails" />
            </Typography>
            <ListComponent
              fieldName="series"
              label={<FormattedMessage id="form.common.title" />}
              value={values.series}
            />
            {values.issn && (
              <ListComponent
                fieldName="issn"
                label={<FormattedMessage id="form.common.identifier" />}
                value={values.issn}
              />
            )}
            {values.volume && (
              <ListComponent
                fieldName="volume"
                label={<FormattedMessage id="form.common.volume" />}
                value={values.volume}
              />
            )}
          </div>
        )}

        {/* Julkaisun lisätiedot - Publication additional details*/}
        <div className="listComponentContainer listComponentPublicationDetails">
          <Typography variant="h3" className="listComponentContainerHeader">
            <FormattedMessage id="form.isbnIsmn.preview.publicationDetails" />
          </Typography>
          <ListComponent
            fieldName="publicationsPublic"
            label={<FormattedMessage id="form.isbnIsmn.preview.isPublic" />}
            value={
              values.publicationsPublic ? (
                <FormattedMessage id="common.yes" />
              ) : (
                <FormattedMessage id="common.no" />
              )
            }
          />
          <ListComponent
            fieldName="publicationType"
            label={<FormattedMessage id="form.common.type" />}
            value={intl.formatMessage({
              id: `form.isbnIsmn.availability.type.option.${values.publicationType?.toLowerCase()}`
            })}
          />
          {values.publicationType === PUBLICATION_TYPES.MAP && values.mapScale && (
            <ListComponent
              fieldName="mapScale"
              label={<FormattedMessage id="form.isbnIsmn.publicationInfo.scale" />}
              value={values.mapScale}
            />
          )}
        </div>
      </div>
    </>
  );
}

Preview.propTypes = {
  values: PropTypes.object.isRequired,
  intl: PropTypes.object
};

export default Preview;
