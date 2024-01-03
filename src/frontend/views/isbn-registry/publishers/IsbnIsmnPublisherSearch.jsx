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

import React, {useEffect, useReducer, useState} from 'react';
import {FormattedMessage} from 'react-intl';

import {Typography, InputLabel} from '@mui/material';
import BookIcon from '@mui/icons-material/MenuBook';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

import useSearch from '/src/frontend/hooks/useSearch';
import useDocumentTitle from '/src/frontend/hooks/useDocumentTitle';

import SearchComponent from '/src/frontend/components/SearchComponent.jsx';
import TableComponent from '/src/frontend/components/TableComponent.jsx';
import PopoverComponent from '/src/frontend/components/PopoverComponent.jsx';
import Spinner from '/src/frontend/components/Spinner.jsx';
import IsbnIsmnPublisherModal from './IsbnIsmnPublisherModal.jsx';

import '/src/frontend/css/common.css';

function IsbnIsmnPublisherSearch() {
  // Component state
  const initialSearchBody = {
    searchText: '',
    limit: 10,
    offset: 0
  };

  const [searchBody, updateSearchBody] = useReducer((prev, next) => {
    return {...prev, ...next};
  }, initialSearchBody);

  // Detailed publisher modal view
  const [selectedPublisherId, setSelectedPublisherId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Clear publisher view
    if (!isModalOpen) {
      setSelectedPublisherId(null);
    }
  }, [isModalOpen]);

  const {data, loading, error} = useSearch({
    url: '/api/public/isbn-registry/publishers/query',
    method: 'POST',
    body: searchBody,
    dependencies: [searchBody],
    prefetch: true,
    fetchOnce: false
  });

  // Set the title of the current page
  useDocumentTitle('menu.publisherRegistry');

  // COMPONENT EFFECTS START HERE
  // When rows per page changes, change page to zero with new rows per page value
  function updateRowsPerPage(rowsPerPage) {
    updateSearchBody({limit: rowsPerPage, offset: 0});
  }

  // When table row is clicked, redirect to publisher view
  const handleTableRowClick = (id) => {
    setSelectedPublisherId(id);
    setIsModalOpen(true);
  };

  // When page is changed, change offset
  function updatePageNumber(pageIdx) {
    updateSearchBody({offset: pageIdx * searchBody.limit});
  }

  // Updates search text
  function updateSearchText(searchText) {
    updateSearchBody({searchText, offset: 0});
  }

  // Rows displayed in table
  const headRows = [
    {id: 'type', intlId: 'form.common.type'},
    {id: 'name', intlId: 'form.common.name'},
    {id: 'otherNames', intlId: 'form.common.otherNames'},
    {id: 'isActive', intlId: 'table.headRows.active'},
    {id: 'activeIdentifiers', intlId: 'publisherRegistry.headRows.activeIdentifiers'}
  ];

  // Get the component based on state
  const getComponent = () => {
    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return (
        <Typography variant="h2" className="normalTitle">
          <FormattedMessage id="errorPage.message.defaultError" />
        </Typography>
      );
    }

    return (
      <TableComponent
        dataTestName={'publisher-registry-search-results'}
        loading={loading}
        pagination
        data={data.results.map((v) => formatSearchResult(v))}
        handleTableRowClick={handleTableRowClick}
        headRows={headRows}
        page={searchBody.offset !== 0 ? searchBody.offset / searchBody.limit : 0}
        setPage={updatePageNumber}
        totalDoc={data.totalDoc}
        rowsPerPage={searchBody.limit}
        setRowsPerPage={updateRowsPerPage}
        unprioritizedRows={['type']}
        unprioritizedMobileRows={['activeIdentifiers']}
      />
    );
  };

  return (
    <div className="listSearch">
      <InputLabel htmlFor="search-input">
        <Typography variant="h2" className="normalTitle publisherRegisterTitle">
          <FormattedMessage id="publisherRegistry.title" />
        </Typography>
      </InputLabel>
      <SearchComponent dataTestName={'publisher-registry-search-form'} searchFunction={updateSearchText} className="publisherRegisterSearch" />
      <div className="publisherRegisterTable">{getComponent()}</div>
      {/* Display modal if selecting publisher from table */}
      {selectedPublisherId && (
        <IsbnIsmnPublisherModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          publisherId={selectedPublisherId}
        />
      )}
    </div>
  );
}

// Formatting the data to be displayed in the table
function formatSearchResult(publisher) {
  const getPublisherTypeIcon = (publisher) => {
    // If publisher has both ISBN and ISMN subranges, show both icons
    if (publisher.activeIdentifierIsbn && publisher.activeIdentifierIsmn) {
      return (
        <>
          <PopoverComponent
            keyboardFocus={false}
            icon={<BookIcon />}
            infoText={<FormattedMessage id="publisherRegistry.popover.isbn" />}
          />
          <PopoverComponent
            keyboardFocus={false}
            icon={<MusicNoteIcon />}
            infoText={<FormattedMessage id="publisherRegistry.popover.ismn" />}
          />
        </>
      );
    }

    // Otherwise, show the icon for the type of subranges the publisher has
    if (publisher.activeIdentifierIsbn) {
      return (
        <PopoverComponent
          keyboardFocus={false}
          icon={<BookIcon />}
          infoText={<FormattedMessage id="publisherRegistry.popover.isbn" />}
        />
      );
    }

    if (publisher.activeIdentifierIsmn) {
      return (
        <PopoverComponent
          keyboardFocus={false}
          icon={<MusicNoteIcon />}
          infoText={<FormattedMessage id="publisherRegistry.popover.ismn" />}
        />
      );
    }

    return;
  };

  return {
    type: getPublisherTypeIcon(publisher),
    id: publisher.id,
    name: publisher.officialName,
    otherNames: publisher.otherNames,
    isActive: !publisher.hasQuitted,
    activeIdentifiers: [
      {isbn: publisher.activeIdentifierIsbn},
      {ismn: publisher.activeIdentifierIsmn}
    ]
  };
}

export default IsbnIsmnPublisherSearch;
