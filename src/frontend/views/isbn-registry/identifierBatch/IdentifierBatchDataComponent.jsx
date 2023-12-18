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

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {withRouter} from 'react-router-dom';

import {
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

import ListComponent from '/src/frontend/components/ListComponent.jsx';
import IsbnIsmnPublisherModal from '/src/frontend/views/isbn-registry/publishers/IsbnIsmnPublisherModal.jsx';

function IdentifierBatchDataComponent({identifierBatch, handleDownload, hasApproved, handleApprove, handleReject}) {
  // State of the publisher details modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='listComponentContainer publicBatchContainer'>
      <Typography variant="h3" className='listComponentContainerHeader'>
        <FormattedMessage id="common.batchDetails" />
      </Typography>
      <ListComponent
        fieldName="publisher"
        label={<FormattedMessage id="common.publisher.isbn" />}
        value={identifierBatch.publisherName}
      />

      {/* Modal with publisher details */}
      {identifierBatch.publisherId &&
        <IsbnIsmnPublisherModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          publisherId={identifierBatch.publisherId}
        />
      }

      <ListComponent
        fieldName="identifierType"
        label={<FormattedMessage id="ranges.identifierType" />}
        value={identifierBatch.identifierType ?? ''}
      />

      <div className='publicBatchButtons'>
        <Button data-test='identifierbatch-view-publisher-button' variant="outlined" onClick={() => setIsModalOpen(true)}>
          <FormattedMessage id="common.publisherDetails.isbn" />
        </Button>
      </div>

      <div className='publicBatchButtons'>
        <Button data-test='identifierbatch-view-download-batch-button' variant="outlined" onClick={handleDownload} startIcon={<DownloadIcon />}>
          <FormattedMessage id="form.button.label.downloadAsTextfile" />
        </Button>
      </div>

      <>
        <Dialog
          open={hasApproved}
          onClose={handleReject}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          data-test='identifierbatch-confirmation'
        >
          <DialogTitle id="alert-dialog-title" data-test='identifierbatch-confirmation-title'>
            <FormattedMessage id="modal.publicBatch.confirmation" />
          </DialogTitle>
          <DialogContent className="dialogContent">
            <DialogContentText data-test='identifierbatch-confirmation-text-fin' id="alert-dialog-description">
              <FormattedMessage id="modal.publicBatch.confirmation.text.part1" />
              <strong>{identifierBatch.publisherName}</strong>
              <FormattedMessage id="modal.publicBatch.confirmation.text.part2" />
              <strong>{identifierBatch.publisherIdentifier}</strong>
            </DialogContentText>

            <DialogContentText data-test='identifierbatch-confirmation-text-swe' id="alert-dialog-description">
              <FormattedMessage id="modal.publicBatch.confirmation.text.part3" />
              <strong>{identifierBatch.publisherName}</strong>
              <FormattedMessage id="modal.publicBatch.confirmation.text.part4" />
              <strong>{identifierBatch.publisherIdentifier}</strong>
            </DialogContentText>

            <DialogContentText data-test='identifierbatch-confirmation-text-eng' id="alert-dialog-description">
              <FormattedMessage id="modal.publicBatch.confirmation.text.part5" />
              <strong>{identifierBatch.publisherName}</strong>
              <FormattedMessage id="modal.publicBatch.confirmation.text.part6" values={{id: identifierBatch.publisherIdentifier}} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button data-test='identifierbatch-confirmation-no' onClick={handleReject}>
              <FormattedMessage id="common.false.allLangs" />
            </Button>
            <Button data-test='identifierbatch-confirmation-yes' onClick={handleApprove} autoFocus>
              <FormattedMessage id="common.true.allLangs" />
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </div>
  );
}

IdentifierBatchDataComponent.propTypes = {
  identifierBatch: PropTypes.object.isRequired,
  handleDownload: PropTypes.func.isRequired,
  hasApproved: PropTypes.bool.isRequired,
  handleApprove: PropTypes.func.isRequired,
  handleReject: PropTypes.func.isRequired
};

export default withRouter(IdentifierBatchDataComponent);
