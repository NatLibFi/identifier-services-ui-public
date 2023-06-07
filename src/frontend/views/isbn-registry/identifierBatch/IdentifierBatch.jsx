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
import useDocumentTitle from '/src/frontend/hooks/useDocumentTitle';

function IdentifierBatch ({configuration, match}) {
  // Set the title of the current page
  useDocumentTitle('common.batch');

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

  // Fetch the batch data
  const {data, loading, error} = useItem({
    url: `/api/isbn-registry/identifierbatches/${id}`,
    method: 'GET',
    dependencies: [],
    prefetch: true,
    fetchOnce: true
  });

  // Turnstile callback api function
  async function makeApiCall(turnstileToken) {
    await downloadIdentifierBatch(id, turnstileToken);
  }

  // Turnstile
  async function handleBatchDownload() {
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
    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorPage errorMessage="error.identifierBatch.invalid" />;
    }

    return (
      <IdentifierBatchDataComponent identifierBatch={data} handleDownload={handleBatchDownload} />
    );
  };

  return (
    <Grid item xs={12}>
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
  match: PropTypes.object.isRequired
};

export default IdentifierBatch;
