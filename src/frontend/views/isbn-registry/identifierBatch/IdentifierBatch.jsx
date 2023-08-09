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

import {Grid, Typography} from '@mui/material';

import useItem from '/src/frontend/hooks/useItem';
import {downloadIdentifierBatch} from '/src/frontend/actions';

import '/src/frontend/css/common.css';
import '/src/frontend/css/batch.css';

import ErrorPage from '/src/frontend/components/ErrorPage.jsx';
import Spinner from '/src/frontend/components/Spinner.jsx';

import IdentifierBatchDataComponent from '/src/frontend/views/isbn-registry/identifierBatch/IdentifierBatchDataComponent.jsx';
import RenderTurnstileNotification from '/src/frontend/components/form/RenderTurnstileNote.jsx';

import useDocumentTitle from '/src/frontend/hooks/useDocumentTitle';

function IdentifierBatch ({history, configuration, match, setSnackbarMessage}) {
  // Set the title of the current page
  useDocumentTitle('common.batch');

  // State of the confirmation modal
  const [hasApproved, setHasApproved] = useState(true);

  // Handles the closing of the modal after successful confirmation
  const handleApprove = () => setHasApproved(false);

  // Redirects to the main page if the user doesn't confirm having access to the batch
  const handleReject = () => {
    setHasApproved(false);
    history.push('/');
  };

  // Current range's id
  const {disableTurnstile, siteKey} = configuration;
  const id = match.params.id;

  // Turnstile
  const [turnstileId, setTurnstileId] = useState(null);
  const turnstileConfiguration = {
    sitekey: siteKey,
    callback: (token) => makeApiCall(token),
    'refresh-expired': 'never'
  };

  const [loadingTurnstile, setLoadingTurnstile] = useState(false);

  // Fetch the batch data
  const {data, loading, error} = useItem({
    url: `/api/public/isbn-registry/identifierbatches/${id}`,
    method: 'GET',
    dependencies: [],
    prefetch: true,
    fetchOnce: true
  });

  // Turnstile callback api function
  async function makeApiCall(turnstileToken) {
    await downloadIdentifierBatch(id, turnstileToken);
    setLoadingTurnstile(false);
  }

  async function loadTurnstilScript(setSnackbarMessage) {
    return new Promise(resolve => {
      if(typeof window.turnstile === 'undefined') {
        const url = 'https://challenges.cloudflare.com/turnstile/v0/api.js';

        const scriptElement = document.createElement('script');
        scriptElement.src = url;
        scriptElement.type = 'text/javascript';
        scriptElement.async = true;
        scriptElement.referrerPolicy = 'no-referrer';

        scriptElement.onerror = () => setSnackbarMessage({severity: 'error', intlId: 'serviceMessage.turnstileScript.error'});
        scriptElement.onload = resolve;

        document.head.appendChild(scriptElement);
        return;
      }

      return resolve();
    });
  }

  // Turnstile
  async function handleBatchDownload() {
    setLoadingTurnstile(true);
    await loadTurnstilScript(setSnackbarMessage);

    if(disableTurnstile) {
      return makeApiCall();
    }

    try {
      if(turnstileId) {
        window.turnstile.reset(turnstileId);
      } else {
        const turnstileWidgedId = window.turnstile.render('#turnstileWidget', turnstileConfiguration);
        setTurnstileId(turnstileWidgedId);
      }
    } catch(err) {
      // Attempt reinitializing widget once more
      const turnstileWidgedId = window.turnstile.render('#turnstileWidget', turnstileConfiguration);

      setTurnstileId(turnstileWidgedId);
    }

    // For disabling buttons set minimum resolve time to 3 seconds
    return await new Promise(r => setTimeout(r, 3000));
  }

  // Get the component based on state
  const getComponent = () => {
    if (loading || loadingTurnstile || Object.keys(data).length === 0) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorPage errorMessage="error.identifierBatch.invalid" />;
    }

    return (
      <IdentifierBatchDataComponent
        identifierBatch={data}
        handleDownload={handleBatchDownload}
        hasApproved={hasApproved}
        handleApprove={handleApprove}
        handleReject={handleReject}
      />
    );
  };

  return (
    <Grid item xs={12}>
      {!loading && !error && Object.keys(data).length > 0 && <RenderTurnstileNotification identifierBatch={true}/>}
      {data.publisherName && (
        <Typography variant="h2" className='batchesTitleColorPublic normalTitle'>
          <FormattedMessage id="common.batch" /> -{' '}
          {data.publisherName}
        </Typography>
      )}
      <Grid container spacing={3} className="batchContainer">
        {getComponent()}
      </Grid>
      {/* Required for turnstile */}
      <div id={'turnstileWidget'} style={{textAlign: 'center'}}></div>
    </Grid>
  );
}

IdentifierBatch.propTypes = {
  configuration: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  setSnackbarMessage: PropTypes.func.isRequired
};

export default IdentifierBatch;
