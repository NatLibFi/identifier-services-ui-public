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

import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Form} from 'react-final-form';
import {FormattedMessage, useIntl} from 'react-intl';

import {
  Button,
  CircularProgress,
  Grid,
  Stepper,
  MobileStepper,
  Step,
  StepLabel,
  Typography
} from '@mui/material';
import {InfoOutlined, KeyboardArrowRight, KeyboardArrowLeft} from '@mui/icons-material';

import '/src/frontend/css/forms/common.css';
import '/src/frontend/css/forms/publisherRegistrationForm.css';
import '/src/frontend/css/forms/issnRegistrationForm.css';

import FormElement from '/src/frontend/components/form/render/RenderFormElement.jsx';
import {formatLanguage} from '/src/frontend/components/form/utils';
import useDocumentTitle from '/src/frontend/hooks/useDocumentTitle';
import {createRequest} from '/src/frontend/actions';

import {getSteps} from '/src/frontend/components/form/issnRegistrationForm/logic';
import {getFormPages} from '/src/frontend/components/form/issnRegistrationForm/content';
import {validate} from '/src/frontend/components/form/issnRegistrationForm/validation';
import {formatValues} from '/src/frontend/components/form/issnRegistrationForm/utils';

import RenderIssnInstructions from '/src/frontend/components/form/issnRegistrationForm/RenderIssnInstructions.jsx';
import RenderTurnstileNotification from '/src/frontend/components/form/RenderTurnstileNote.jsx';

import Preview from '/src/frontend/components/form/issnRegistrationForm/Preview.jsx';

function IssnPublicationRegistrationForm (props) {
  const {history, language, configuration, setSnackbarMessage} = props;
  const {disableTurnstile, siteKey} = configuration;

  // Set the title of the current page
  useDocumentTitle('form.issn.title');

  const intl = useIntl();
  const formattedLanguage = formatLanguage(language);

  // Index of the current step
  const [activeStep, setActiveStep] = useState(0);
  const [information, setInformation] = useState(true);
  const [turnstileId, setTurnstileId] = useState(null);

  // Attempt on loading Turnstile script after information has been viewed and user has decided to progress to form
  useEffect(() => {
    if(!information && typeof window.turnstile === 'undefined') {
      const url = 'https://challenges.cloudflare.com/turnstile/v0/api.js';

      const scriptElement = document.createElement('script');
      scriptElement.src = url;
      scriptElement.type = 'text/javascript';
      scriptElement.async = true;
      scriptElement.referrerPolicy = 'no-referrer';

      scriptElement.onerror = () => setSnackbarMessage({severity: 'error', intlId: 'serviceMessage.turnstileScript.error'});

      document.head.appendChild(scriptElement);
      return;
    }
  }, [information, activeStep]);

  // Handles going to the next step
  const handleNext = (e) => {
    e.preventDefault(); // Added to prevent auto-click when using mobile stepper
    setActiveStep(activeStep + 1);

    // Scroll to top
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    // Set focus on the first element of the form on the next page
    const form = document.getElementsByClassName('wideContainer')[0];
    const firstElement = form.querySelector('input, select, textarea');
    firstElement.focus();
  };

  // Handles going to the previous step
  const handleBack = () => {
    if (activeStep === 0) {
      return setInformation(true);
    }

    setActiveStep(activeStep - 1);

    // Scroll to top
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  // Handles sending the form
  const handlePublisherRegistration = async values => {
    // This block scoped value is here so that we know when to resolve
    // the loading that happens inside the turnstile callback
    let loading = true;

    if(disableTurnstile) {
      return makeApiCall();
    }

    // Reset turnstile ID if the challenge has already been presented
    if(turnstileId) {
      window.turnstile.reset(turnstileId);
    }

    const turnstileWidgedId = window.turnstile.render('#turnstileWidget', {
      sitekey: siteKey,
      callback: (token) => makeApiCall(token),
      'error-callback': () => {loading = false;},
      'refresh-expired': 'never'
    });

    setTurnstileId(turnstileWidgedId);

    // For disabling buttons
    return await new Promise(loadingHasEnded);

    // Uses loading state from outer scope
    async function loadingHasEnded(resolve) {
      if(!loading) {
        return resolve(true);
      }

      // Periodically check whether the loading has completed
      await new Promise(r => setTimeout(r, 1000));
      return loadingHasEnded(resolve);
    }

    async function makeApiCall(turnstileToken) {
      const apiValues = {...formatValues({...values}, formattedLanguage), turnstileToken};
      await createRequest(apiValues, '/api/public/issn-registry/requests', history, setSnackbarMessage);
      loading = false; // Sets loading to false to outer scope since API responded to request
    }
  };

  return information ? (
    <div>
      <h2>
        <FormattedMessage id="menu.forms.publicationRegistration.issn"/>
      </h2>
      <RenderTurnstileNotification setInformation={setInformation}/>
    </div>
  ) : (
    <Form
      validate={validate}
      onSubmit={handlePublisherRegistration}
      initialValues={{number_of_versions: '1'}}
    >
      {({handleSubmit, errors, values, form, submitting}) => {
        // Get form values
        const formValues = form.getState().values;

        // Get an object with all the steps, their fields and render types
        const content = getFormPages(formValues);

        // Get an array with the step labels
        const contentOrder = getSteps(content);
        const isFinalPage = activeStep === contentOrder.length - 1;

        // Get an object with the current step's fields and render type
        const activeContent = () =>
          activeStep > contentOrder.length - 1
        && activeStep < contentOrder.length - 1
            ? undefined
            : content[contentOrder[activeStep]];

        // Handles the state of the Next-button
        const disableNextButton = (errors) => {
          if(typeof errors !== 'object') {
            return false;
          }

          const pageContent = activeContent();

          if(!pageContent) {
            return false;
          }

          /* Checking if there are any errors related to the current page's content in the errors object (object comes from validation).
          Button is disabled until there are no errors - every required field is filled and no validaton errors exist. */
          return Object.keys(errors).some(error => activeContent().fields.map(field => field.name).includes(error));
        };

        return (
          <form
            className={'wideContainer'}
            onSubmit={handleSubmit}
          >
            <div className='topSticky'>
              <Typography variant="h2" className='normalTitle'>
                <FormattedMessage id="form.issn.title"/>
              </Typography>
              {/* Normal Stepper is visible when screen > 500px */}
              <Stepper
                alternativeLabel
                className='basicSmallStepperStyle'
                activeStep={activeStep}
              >
                {contentOrder.map(label => (
                  <Step key={label}>
                    <StepLabel>
                      <FormattedMessage id={`form.issn.stepper.label.${label}`}/>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              {/* Mobile Stepper is visible when screen < 500px */}
              <MobileStepper
                variant="dots"
                steps={contentOrder.length}
                position="static"
                activeStep={activeStep}
                className='mobileSmallStepperStyle'
                nextButton={
                  isFinalPage
                    ? (
                      <Button
                        size="small"
                        disabled={submitting}
                        type="submit"
                      >
                        <FormattedMessage id="form.button.label.submit"/>
                        <KeyboardArrowRight/>
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        disabled={disableNextButton(errors, values)}
                        onClick={handleNext}
                      >
                        <FormattedMessage id="form.button.label.next"/>
                        <KeyboardArrowRight/>
                      </Button>)
                }
                backButton={
                  <Button
                    size="small"
                    disabled={submitting}
                    onClick={handleBack}
                  >
                    <KeyboardArrowLeft/>
                    <FormattedMessage id="form.button.label.back"/>
                  </Button>
                }
              />
            </div>
            {/* Display an info message regarding required fields marked with an asterisk */}
            {!isFinalPage && (
              <span className='requiredFieldInfo'>
                <InfoOutlined/>
                <FormattedMessage id="common.requiredField"/>
              </span>
            )}
            <div className="issnFormContainer">
              <Grid container spacing={2} className="issnFormGrid">
                {/* Render the fields of the current step */}
                {activeContent(values)?.renderType === 'element'
                  && <FormElement
                    array={activeContent(values).fields}
                    values={values}
                    intl={intl}
                  />
                }

                {/* Render the preview of a form with the data passed by user */}
                {isFinalPage && <Preview values={formatValues(values)}/>}
              </Grid>

              <Grid container spacing={2} className="issnFormGrid">
                {/* Render instructions */}
                {activeStep === 0 && <RenderIssnInstructions/>}
              </Grid>

              {/* Required for turnstile */}
              <div id={'turnstileWidget'} style={{textAlign: 'center'}}>
                {/* Display loading when loading */}
                {submitting && <CircularProgress/>}
              </div>

              {/* Back, next & submit buttons */}
              <div className={isFinalPage ? 'formSubmitButtonsContainer' : 'formButtonsContainer'}>
                <Button
                  data-test='issn-form-back-button'
                  disableRipple
                  disabled={submitting}
                  onClick={handleBack}
                >
                  <FormattedMessage id="form.button.label.back"/>
                </Button>
                {activeStep !== contentOrder.length - 1 && (
                  <Button
                    data-test='issn-form-next-button'
                    disableRipple
                    variant="contained"
                    color="primary"
                    disabled={disableNextButton(errors, values)}
                    onClick={handleNext}
                  >
                    <FormattedMessage id="form.button.label.next"/>
                  </Button>
                )}
                {isFinalPage && (
                  <Button
                    data-test='issn-form-submit-button'
                    disableRipple
                    disabled={submitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    <FormattedMessage id="form.button.label.submit"/>
                  </Button>
                )}
              </div>
            </div>
          </form>
        );}}
    </Form>
  );
}

IssnPublicationRegistrationForm.propTypes = {
  history: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  configuration: PropTypes.object.isRequired,
  setSnackbarMessage: PropTypes.func.isRequired
};

export default IssnPublicationRegistrationForm;
