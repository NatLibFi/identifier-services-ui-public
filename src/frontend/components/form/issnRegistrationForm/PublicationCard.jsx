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

function PublicationCard ({publication, index}) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h3" className='normalTitle'>
          <FormattedMessage
            id="request.issn.preview.title"
            values={{index: ++index, title: publication.title}}
          />
        </Typography>
      </AccordionSummary>
      <AccordionDetails className="issnAccordionFields">
        <div>
          <Typography>
            <FormattedMessage id="form.common.title" />:
          </Typography>
          <Typography>{publication.title}</Typography>
        </div>
        {publication.subtitle && (
          <div>
            <Typography>
              <FormattedMessage id="form.common.subtitle" />:
            </Typography>
            <Typography>{publication.subtitle}</Typography>
          </div>
        )}
        <div>
          <Typography>
            <FormattedMessage id="form.common.publicationCity" />:
          </Typography>
          <Typography>{publication.placeOfPublication}</Typography>
        </div>
        <div>
          <Typography>
            <FormattedMessage id="publication.issn.firstYear" />:
          </Typography>
          <Typography>{publication.issuedFromYear}</Typography>
        </div>
        <div>
          <Typography>
            <FormattedMessage id="publication.issn.issued_from_number" />:
          </Typography>
          <Typography>{publication.issuedFromNumber}</Typography>
        </div>
        <div>
          <Typography>
            <FormattedMessage id="publication.issn.frequency" />:
          </Typography>
          <Typography>
            <FormattedMessage id={`common.${publication.frequency}`} />
          </Typography>
        </div>
        {(publication.frequency === 'z' && publication.frequencyOther) && (
          <div>
            <Typography>
              <FormattedMessage id="publication.issn.other" />:
            </Typography>
            <Typography>{publication.frequencyOther}</Typography>
          </div>
        )}
        <div>
          <Typography>
            <FormattedMessage id="form.common.language" />:
          </Typography>
          <Typography>
            <FormattedMessage id={`common.${publication.language?.toLowerCase()}`} />
          </Typography>
        </div>
        <div>
          <Typography>
            <FormattedMessage id="publication.issn.type" />:
          </Typography>
          <Typography>
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
            <Typography>{publication.publicationTypeOther}</Typography>
          </div>
        )}
        <div>
          <Typography>
            <FormattedMessage id="form.common.format" />:
          </Typography>
          <Typography>
            <FormattedMessage id={`common.${publication.medium?.toLowerCase()}`} />
          </Typography>
        </div>
        {publication.printer && (
          <div>
            <Typography>
              <FormattedMessage id="publication.issn.manufacturer" />:
            </Typography>
            <Typography>{publication.printer}</Typography>
          </div>
        )}
        {publication.mediumOther && (
          <div>
            <Typography>
              <FormattedMessage id="publication.issn.other" />:
            </Typography>
            <Typography>{publication.mediumOther}</Typography>
          </div>
        )}
        {publication.url && (
          <div>
            <Typography>
              <FormattedMessage id="form.issn.publicationCard.url" />:
            </Typography>
            <Typography>{publication.url}</Typography>
          </div>
        )}
        {publication.previous && (
          <div>
            <Typography>
              <FormattedMessage id="publication.issn.previousNameForms" />:
            </Typography>
            <Typography>{publication.previous.title[0]}</Typography>
          </div>
        )}
        {publication.previous?.issn[0] && (
          <div>
            <Typography>
              <FormattedMessage id="common.issn" />:
            </Typography>
            <Typography>{publication.previous.issn[0]}</Typography>
          </div>
        )}
        {publication.previous && (
          <div>
            <Typography>
              <FormattedMessage id="publication.issn.lastIssue" />:
            </Typography>
            <Typography>{publication.previous.lastIssue[0]}</Typography>
          </div>
        )}
        {publication.mainSeries && (
          <div>
            <Typography>
              <FormattedMessage id="publication.issn.mainSeries" />:
            </Typography>
            <Typography>{publication.mainSeries.title[0]}</Typography>
          </div>
        )}
        {publication.mainSeries?.issn[0] && (
          <div>
            <Typography>
              <FormattedMessage id="common.issn" />:
            </Typography>
            <Typography>{publication.mainSeries.issn[0]}</Typography>
          </div>
        )}
        {publication.subseries && (
          <div>
            <Typography>
              <FormattedMessage id="publication.issn.subSeries" />:
            </Typography>
            <Typography>{publication.subseries.title[0]}</Typography>
          </div>
        )}
        {publication.subseries?.issn[0] && (
          <div>
            <Typography>
              <FormattedMessage id="common.issn" />:
            </Typography>
            <Typography>{publication.subseries.issn[0]}</Typography>
          </div>
        )}
        {publication.anotherMedium && (
          <div>
            <Typography>
              <FormattedMessage id="publication.issn.anotherFormat" />:
            </Typography>
            <Typography>{publication.anotherMedium.title[0]}</Typography>
          </div>
        )}
        {publication.anotherMedium?.issn[0] && (
          <div>
            <Typography>
              <FormattedMessage id="common.issn" />:
            </Typography>
            <Typography>{publication.anotherMedium.issn[0]}</Typography>
          </div>
        )}
        {publication.additionalInfo && (
          <div>
            <Typography>
              <FormattedMessage id="form.common.additionalDetails" />:
            </Typography>
            <Typography>{publication.additionalInfo}</Typography>
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
