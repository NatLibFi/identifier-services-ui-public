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
import {FormattedMessage} from 'react-intl';

import {Typography, Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function PublicationCard({publication, index}) {
  return (
    <Accordion data-test={`publication-card-${index + 1}`}>
      <AccordionSummary data-test={`publication-card-${index + 1}-summary`} expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h3" className='normalTitle'>
          <FormattedMessage
            id="request.issn.preview.title"
            values={{index: index + 1, title: publication.title}}
          />
        </Typography>
      </AccordionSummary>
      <AccordionDetails className="issnAccordionFields">
        <div>
          <Typography>
            <FormattedMessage id="form.common.title" />:
          </Typography>
          <Typography data-test={`publication-card-${index + 1}-title`}>{publication.title}</Typography>
        </div>
        {publication.subtitle && (
          <div>
            <Typography>
              <FormattedMessage id="form.common.subtitle" />:
            </Typography>
            <Typography data-test={`publication-card-${index + 1}-subtitle`}>{publication.subtitle}</Typography>
          </div>
        )}
        <div>
          <Typography>
            <FormattedMessage id="form.common.publicationCity" />:
          </Typography>
          <Typography data-test={`publication-card-${index + 1}-placeOfPublication`}>{publication.placeOfPublication}</Typography>
        </div>
        <div>
          <Typography>
            <FormattedMessage id="publication.issn.firstYear" />:
          </Typography>
          <Typography data-test={`publication-card-${index + 1}-issuedFromYear`}>{publication.issuedFromYear}</Typography>
        </div>
        <div>
          <Typography>
            <FormattedMessage id="publication.issn.issued_from_number" />:
          </Typography>
          <Typography data-test={`publication-card-${index + 1}-issuedFromNumber`}>{publication.issuedFromNumber}</Typography>
        </div>
        <div>
          <Typography>
            <FormattedMessage id="publication.issn.frequency" />:
          </Typography>
          <Typography data-test={`publication-card-${index + 1}-frequency`}>
            <FormattedMessage id={`common.${publication.frequency}`} />
          </Typography>
        </div>
        {(publication.frequency === 'z' && publication.frequencyOther) && (
          <div>
            <Typography>
              <FormattedMessage id="publication.issn.other" />:
            </Typography>
            <Typography data-test={`publication-card-${index + 1}-frequencyOther`}>{publication.frequencyOther}</Typography>
          </div>
        )}
        <div>
          <Typography>
            <FormattedMessage id="form.common.language" />:
          </Typography>
          <Typography data-test={`publication-card-${index + 1}-language`}>
            <FormattedMessage id={`common.${publication.language?.toLowerCase()}`} />
          </Typography>
        </div>
        <div>
          <Typography>
            <FormattedMessage id="publication.issn.type" />:
          </Typography>
          <Typography data-test={`publication-card-${index + 1}-publicationType`}>
            <FormattedMessage
              id={`common.${publication.publicationType?.toLowerCase()}`}
            />
          </Typography>
        </div>
        {publication.publicationTypeOther && (
          <div>
            <Typography>
              <FormattedMessage id="publication.issn.other" />:
            </Typography>
            <Typography data-test={`publication-card-${index + 1}-publicationTypeOther`}>{publication.publicationTypeOther}</Typography>
          </div>
        )}
        <div>
          <Typography>
            <FormattedMessage id="form.common.format" />:
          </Typography>
          <Typography data-test={`publication-card-${index + 1}-medium`}>
            <FormattedMessage id={`common.${publication.medium?.toLowerCase()}`} />
          </Typography>
        </div>
        {publication.printer && (
          <div>
            <Typography>
              <FormattedMessage id="publication.issn.manufacturer" />:
            </Typography>
            <Typography data-test={`publication-card-${index + 1}-printer`}>{publication.printer}</Typography>
          </div>
        )}
        {publication.mediumOther && (
          <div>
            <Typography>
              <FormattedMessage id="publication.issn.other" />:
            </Typography>
            <Typography data-test={`publication-card-${index + 1}-mediumOther`}>{publication.mediumOther}</Typography>
          </div>
        )}
        {publication.url && (
          <div>
            <Typography>
              <FormattedMessage id="form.issn.publicationCard.url" />:
            </Typography>
            <Typography data-test={`publication-card-${index + 1}-url`}>{publication.url}</Typography>
          </div>
        )}
        {publication.previous && (
          <div>
            <Typography>
              <FormattedMessage id="publication.issn.previousNameForms" />:
            </Typography>
            <Typography data-test={`publication-card-${index + 1}-previous-title`}>{publication.previous.title[0]}</Typography>
          </div>
        )}
        {publication.previous?.issn[0] && (
          <div>
            <Typography>
              <FormattedMessage id="common.issn" />:
            </Typography>
            <Typography data-test={`publication-card-${index + 1}-previous-issn`}>{publication.previous.issn[0]}</Typography>
          </div>
        )}
        {publication.previous && (
          <div>
            <Typography>
              <FormattedMessage id="publication.issn.lastIssue" />:
            </Typography>
            <Typography data-test={`publication-card-${index + 1}-previous-lastIssue`}>{publication.previous.lastIssue[0]}</Typography>
          </div>
        )}
        {publication.mainSeries && (
          <div>
            <Typography>
              <FormattedMessage id="publication.issn.mainSeries" />:
            </Typography>
            <Typography data-test={`publication-card-${index + 1}-mainSeries-title`}>{publication.mainSeries.title[0]}</Typography>
          </div>
        )}
        {publication.mainSeries?.issn[0] && (
          <div>
            <Typography>
              <FormattedMessage id="common.issn" />:
            </Typography>
            <Typography data-test={`publication-card-${index + 1}-mainSeries-issn`}>{publication.mainSeries.issn[0]}</Typography>
          </div>
        )}
        {publication.subseries && (
          <div>
            <Typography>
              <FormattedMessage id="publication.issn.subSeries" />:
            </Typography>
            <Typography data-test={`publication-card-${index + 1}-subseries-title`}>{publication.subseries.title[0]}</Typography>
          </div>
        )}
        {publication.subseries?.issn[0] && (
          <div>
            <Typography>
              <FormattedMessage id="common.issn" />:
            </Typography>
            <Typography data-test={`publication-card-${index + 1}-subseries-issn`}>{publication.subseries.issn[0]}</Typography>
          </div>
        )}
        {publication.anotherMedium && (
          <div>
            <Typography>
              <FormattedMessage id="publication.issn.anotherFormat" />:
            </Typography>
            <Typography data-test={`publication-card-${index + 1}-anotherMedium-title`}>{publication.anotherMedium.title[0]}</Typography>
          </div>
        )}
        {publication.anotherMedium?.issn[0] && (
          <div>
            <Typography>
              <FormattedMessage id="common.issn" />:
            </Typography>
            <Typography data-test={`publication-card-${index + 1}-anotherMedium-issn`}>{publication.anotherMedium.issn[0]}</Typography>
          </div>
        )}
        {publication.additionalInfo && (
          <div>
            <Typography>
              <FormattedMessage id="form.common.additionalDetails" />:
            </Typography>
            <Typography data-test={`publication-card-${index + 1}-additionalInfo`}>{publication.additionalInfo}</Typography>
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

PublicationCard.propTypes = {
  publication: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default PublicationCard;
