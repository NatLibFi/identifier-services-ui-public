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

function IdentifierBatchDataComponent ({identifierBatch, handleDownload, history}) {
  // State of the confirmation modal
  const [open, setOpen] = useState(true);

  // State of the publisher details modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handles the closing of the modal after successful confirmation
  const handleApprove = () => setOpen(false);

  // Redirects to the main page if the user doesn't confirm having access to the batch
  const handleReject = () => {
    setOpen(false);
    history.push('/');
  };

  return (
    <div className='listComponentContainer publicBatchContainer'>
      <Typography variant="h3" className='listComponentContainerHeader'>
        <FormattedMessage id="common.batchDetails"/>
      </Typography>
      <ListComponent
        fieldName="publisher"
        label={<FormattedMessage id="common.publisher.isbn"/>}
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
        label={<FormattedMessage id="ranges.identifierType"/>}
        value={identifierBatch.identifierType ?? ''}
      />

      <div className='publicBatchButtons'>
        <Button variant="outlined" onClick={() => setIsModalOpen(true)}>
          <FormattedMessage id="common.publisherDetails.isbn"/>
        </Button>
      </div>

      <div className='publicBatchButtons'>
        <Button variant="outlined" onClick={handleDownload} startIcon={<DownloadIcon />}>
          <FormattedMessage id="form.button.label.downloadAsTextfile"/>
        </Button>
      </div>

      <>
        <Dialog
          open={open}
          onClose={handleReject}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <FormattedMessage id="modal.publicBatch.confirmation"/>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <FormattedMessage id="modal.publicBatch.confirmation.text.part1"/>
              <strong>{identifierBatch.publisherName}</strong>
              <FormattedMessage id="modal.publicBatch.confirmation.text.part2"/>
              <strong>{identifierBatch.publisherIdentifier}</strong>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleReject}>
              <FormattedMessage id="common.false"/>
            </Button>
            <Button onClick={handleApprove} autoFocus>
              <FormattedMessage id="common.true"/>
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
  history: PropTypes.object
};

export default withRouter(IdentifierBatchDataComponent);
