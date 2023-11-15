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

import React, {useEffect, useState} from 'react';
import {FormattedMessage, IntlProvider} from 'react-intl';
import {Switch, Route, withRouter} from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

// Configuration getter
import {getConfig} from '/src/frontend/actions';

// Main common components
import Home from './views/Home.jsx';
import CustomizedSnackbar from '/src/frontend/components/CustomizedSnackbar.jsx';
import ErrorPage from '/src/frontend/components/ErrorPage.jsx';
import Footer from '/src/frontend/components/Footer.jsx';
import Spinner from '/src/frontend/components/Spinner.jsx';
import NotificationBanner from './components/NotificationBanner.jsx';

// Navigation components
import TopNav from './components/navbar/TopNav.jsx';
import MenuBar from './components/navbar/MenuBar.jsx';

// Forms
import IsbnIsmnPublicationRegistrationForm from '/src/frontend/views/isbn-registry/forms/IsbnIsmnPublicationRegistrationForm.jsx';
import IssnRegistrationForm from './views/issn-registry/forms/IssnPublicationRegistrationForm.jsx';
import PublisherRegistrationForm from './views/isbn-registry/forms/PublisherRegistrationForm.jsx';

// Publishers
import PublishersList from './views/isbn-registry/publishers/IsbnIsmnPublisherSearch.jsx';

// Batch
import Batch from './views/isbn-registry/identifierBatch/IdentifierBatch.jsx';

// Accessibility statement
import AccessibilityStatement from './views/AccessibilityStatement.jsx';

// Language config
import {translations} from './intl/index.js';

// Styles
import '/src/frontend/css/global.css';
import '/src/frontend/css/app.css';

function App() {
  const [configuration, setConfiguration] = useState({});
  const [loading, setLoading] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [showNotificationBanner, setShowNotificationBanner] = useState(false);

  // Check if language is saved in local storage
  // const languageInLocalStorage = localStorage.getItem('language') ?? null;

  // Get list of user preferred languages from the browser settings
  const userPreferredLanguages = navigator.languages;

  // Language versions available in the app
  const availableLanguages = Object.keys(translations);

  // Get language to use based on local storage, order of user preferred languages and language versions available in the app
  const getPrimaryLanguage = () => {
    // Check if language is saved in local storage and use it if it is available in the app

    //if (languageInLocalStorage && availableLanguages.includes(languageInLocalStorage)) {
    //  return languageInLocalStorage;
    //}


    /* If no language is saved in local storage continue with the steps below */

    // Check if some of the user preferred languages is available in the app (use the first one found)
    const primaryLanguage = userPreferredLanguages.find(language =>
      availableLanguages.includes(language.slice(0, 2))
    );

    if (primaryLanguage) {
      // Save preferred language to local storage
      // localStorage.setItem('language', primaryLanguage.slice(0, 2));

      // Slice is used (here and above), since language can be presented in different formats, however we need only the first two letters
      return primaryLanguage.slice(0, 2);
    }

    // If no user preferred language is available in the app, use the default language ('fi')
    return 'fi';
  };

  // Load config
  useEffect(() => {
    async function fetchConfig() {
      const fetchedConfig = await getConfig();
      setConfiguration(fetchedConfig);

      // If config contains message, set showNotificationBanner
      if(fetchedConfig.notificationBanner?.text && fetchedConfig.notificationBanner?.title) {
        setShowNotificationBanner(true);
      }

      setLoading(false);
    }

    fetchConfig();
  }, []);

  // Language state
  const [language, setLanguage] = useState(getPrimaryLanguage());

  // Handles language change
  function changeLanguage(newLanguage) {
    // Validate the messages for language exists
    if(availableLanguages.includes(newLanguage)) {
      const documentHtml = document.querySelector('html');

      if (documentHtml !== newLanguage) {
        documentHtml.setAttribute('lang', newLanguage);
      }

      // Set language to state
      setLanguage(newLanguage);

      // Save language to local storage
      // localStorage.setItem('language', newLanguage);
    }
  }

  // Public routes
  const publicRoutes = [
    {path: '/', component: Home},
    {path: '/errorpage', component: ErrorPage},
    // ISBN-registry: publishers
    {path: '/isbn-registry/publishers', component: PublishersList},
    // ISBN-registry: batch download for publishers
    {path: '/isbn-registry/identifierbatches/:id', component: Batch},
    // Form routes
    {path: '/forms/isbn-ismn-publication', component: IsbnIsmnPublicationRegistrationForm},
    {path: '/forms/isbn-ismn-publisher', component: PublisherRegistrationForm},
    {path: '/forms/issn-publication', component: IssnRegistrationForm},
    // Accessibility statement
    {path: '/accessibility-statement', component: AccessibilityStatement}
  ];

  const routes = (
    <>
      {publicRoutes.map(fields => (
        <Route
          key={fields.path}
          exact
          path={fields.path}
          render={props => <fields.component setSnackbarMessage={setSnackbarMessage} configuration={configuration} language={language} {...props}/>}
        />
      ))}
    </>
  );

  // Get the component based on state
  const getComponent = () => {
    if (loading) {
      return <Spinner/>;
    }

    if (configuration.maintenance) {
      return <ErrorPage errorType={'SERVICE_UNDER_MAINTENANCE'}/>;
    }

    return <Switch>{routes}</Switch>;
  };

  return (
    <IntlProvider locale={language} messages={translations[language]}>
      {/* CssBaseline is a MUI global style reset */}
      <CssBaseline/>
      {showNotificationBanner &&
        <NotificationBanner
          // "error" (red), "warning" (orange), "info" (blue), "success" (green)
          type={configuration.notificationBanner.type}
          message={configuration.notificationBanner.text[language]}
          title={configuration.notificationBanner.title[language]}
          // optional prop, used for styling
          // variant='filled'
          // optional prop, can be used to give user a way to close the banner, otherwise can be omitted, then banner is not closable
          action={() => setShowNotificationBanner(false)}
          // optional prop, can be used to hide the icon, otherwise can be omitted
          // icon={false}
        />
      }
      {/* Skip to main content link */}
      <a href="#main-content" className="skipLink">
        <FormattedMessage id="common.skipLink"/>
      </a>
      {/* App content wrapper */}
      <div className='appWrapper'>
        {/* Top navigation bar & Menu bar */}
        <TopNav environment={configuration.environment} currentLanguage={language} availableLanguages={availableLanguages} handleLanguageChange={changeLanguage}/>
        <MenuBar language={language} contactInformationChangeUrl={configuration.contactInformationChangeUrl}/>
        {/* Main content */}
        <div className='bodyContainer' id='main-content'>
          {getComponent()}
          {snackbarMessage && <CustomizedSnackbar message={snackbarMessage} setMessage={setSnackbarMessage}/>}
        </div>
        <Footer customerServiceContact={configuration.customerServiceContact ?? {}}/>
      </div>
    </IntlProvider>
  );
}

export default withRouter(App);
