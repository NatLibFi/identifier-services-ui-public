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
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import InfoCard from '/src/frontend/components/subComponents/InfoCard.jsx';
import FormElement from '/src/frontend/components/form/render/RenderFormElement.jsx';
import {formatLanguage} from '/src/frontend/components/form/utils';
import useDocumentTitle from '/src/frontend/hooks/useDocumentTitle';
import {createRequest} from '/src/frontend/actions';

import RenderInformation from '/src/frontend/components/form/publisherRegistrationForm/RenderInformation.jsx';
import {getSteps} from '/src/frontend/components/form/publisherRegistrationForm/logic';
import {formatPublisher} from '/src/frontend/components/form/publisherRegistrationForm/utils';
import {getFormPages} from '/src/frontend/components/form/publisherRegistrationForm/content';
import Preview from '/src/frontend/components/form/publisherRegistrationForm/Preview.jsx';
import {validate} from '/src/frontend/components/form/publisherRegistrationForm/validation';

import '/src/frontend/css/forms/common.css';
import '/src/frontend/css/forms/publisherRegistrationForm.css';

function PublisherRegistrationForm (props) {
  const {history, language, configuration, setSnackbarMessage} = props;
  const {disableTurnstile, siteKey} = configuration;

  // Set the title of the current page
  useDocumentTitle('form.publisherRegistration.title');

  const intl = useIntl();
  const formattedLanguage = formatLanguage(language);

  // Index of the current step
  const [activeStep, setActiveStep] = useState(0);
  const [information, setInformation] = useState(true);
  const [turnstileId, setTurnstileId] = useState(null);

  const content = getFormPages();
  const contentOrder = getSteps();
  const activeContent
    = activeStep > contentOrder.length - 1
      && activeStep < contentOrder.length - 1
      ? undefined
      : content[contentOrder[activeStep]];

  const handleNext = (e) => {
    e.preventDefault(); // Added to prevent auto-click when using mobile stepper
    setActiveStep(activeStep + 1);

    // Scroll to top
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    // Set focus on the first element of the form on the next page
    if (activeStep < contentOrder.length - 1) {
      const form = document.getElementsByClassName('subContainer')[0];
      const firstElement = form.querySelector('input, select, textarea');
      firstElement.focus();
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      return setInformation(true);
    }

    // Scroll to top
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    setActiveStep(activeStep - 1);
  };

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
      ['error-callback']: () => {loading = false;}
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
      const formattedPublisherRequest = {...formatPublisher(values, formattedLanguage), turnstileToken};
      await createRequest(formattedPublisherRequest, '/api/isbn-registry/requests/publishers', history, setSnackbarMessage);
      loading = false; // Sets loading to false to outer scope since API responded to request
    }
  };

  // Formats form values if necessary before displaying preview page
  const formatFormValues = (values, changeValue, updateValues) => {
    if(!updateValues) {
      return;
    }

    // If http/https prefix is not included to the form input, add http-prefix to www value
    if(values.www && !values.www.match(/^http(s)?:\/\/.+$/)) {
      changeValue('www', `https://${values.www}`);
    }
  };

  return information ? (
    <RenderInformation setInformation={setInformation}/>
  ) : (
    <Form
      onSubmit={handlePublisherRegistration}
      validate={validate}
    >
      {({handleSubmit, errors, valid, values, form, submitting}) => {
        // Manage publication format information
        const isPreviewPage = activeStep === contentOrder.length - 1;
        formatFormValues(values, form.change, isPreviewPage);

        return (
          <form
            className={activeStep === 3 ? 'container' : 'wideContainer'}
            onSubmit={handleSubmit}
          >
            <div className='topSticky'>
              <Typography variant="h2" className='normalTitle'>
                <FormattedMessage id="form.publisherRegistration.title"/>
              </Typography>
              {/* Normal Stepper is visible when screen > 500px */}
              <Stepper
                alternativeLabel
                className='basicSmallStepperStyle'
                activeStep={activeStep}
              >
                {contentOrder.map(label => (
                  <Step key={label}>
                    <StepLabel className='stepLabelContainer'>
                      <FormattedMessage id={`form.publisherRegistration.stepper.label.${label}`}/>
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
                  isPreviewPage
                    ? (
                      <Button type="submit" disabled={!valid || submitting} size="small">
                        <FormattedMessage id="form.button.label.submit"/>
                        <KeyboardArrowRight/>
                      </Button>
                    ) : (
                      <Button
                        /* Checking if there are any errors related to the current page's content in the errors object (object comes from validation).
                        Button is disabled until there are no errors - every required field is filled and no validaton errors exist. */
                        disabled={(Object.keys(errors).some(error => activeContent.fields.map(field => field.name).includes(error)))}
                        size="small"
                        onClick={handleNext}
                      >
                        <FormattedMessage id="form.button.label.next"/>
                        <KeyboardArrowRight/>
                      </Button>)
                }
                backButton={
                  <Button size="small" onClick={handleBack} disabled={submitting}>
                    <KeyboardArrowLeft/>
                    <FormattedMessage id="form.button.label.back"/>
                  </Button>
                }
              />
            </div>
            <div className={activeStep === 3 ? '' : 'subContainer'}>
              <Grid
                container
                spacing={2}
                direction={activeStep === content.length - 1 ? 'row' : 'column'}
              >
                {activeContent?.renderType === 'element'
                  && <FormElement
                    array={activeContent.fields}
                    values={values}
                    intl={intl}
                  />
                }
                {(activeContent?.renderType === 'element' && activeContent?.fields.some(field => field.name === 'affiliateOf'))
                  && (
                    <div className='organizationDetailsContainer'>
                      <InfoCard infoText="form.publisherRegistration.card.affiliates" cardStyle='orgDetailsInfoCard'/>
                      <InfoCard infoText="form.publisherRegistration.card.distributors" cardStyle='orgDetailsInfoCard'/>
                    </div>
                  )}
                {/* Render the preview of a form with the data passed by user */}
                {isPreviewPage && <Preview values={values}/>}
              </Grid>

              {/* Required for turnstile */}
              <div id={'turnstileWidget'} style={{textAlign: 'center'}}>
                {/* Display loading when loading */}
                {submitting && <CircularProgress/>}
              </div>

              <div className={isPreviewPage ? 'formSubmitButtonsContainer' : 'formButtonsContainer'}>
                <Button disableRipple onClick={handleBack} disabled={submitting}>
                  <FormattedMessage id="form.button.label.back"/>
                </Button>
                {isPreviewPage ? null : (
                  <Button
                    disableRipple
                    type="button"
                    variant="contained"
                    color="primary"
                    /* Checking if there are any errors related to the current page's content in the errors object (object comes from validation).
                    Button is disabled until there are no errors - every required field is filled and no validaton errors exist. */
                    disabled={(Object.keys(errors).some(error => activeContent.fields.map(field => field.name).includes(error)))}
                    onClick={handleNext}
                  >
                    <FormattedMessage id="form.button.label.next"/>
                  </Button>
                )}
                {isPreviewPage && (
                  <Button
                    disableRipple
                    type="submit"
                    disabled={!valid || submitting}
                    variant="contained"
                    color="primary"
                  >
                    <FormattedMessage id="form.button.label.submit"/>
                  </Button>
                )}
              </div>
            </div>
          </form>
        );}
      }
    </Form>
  );
}

PublisherRegistrationForm.propTypes = {
  history: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  configuration: PropTypes.object.isRequired,
  setSnackbarMessage: PropTypes.func.isRequired
};

export default PublisherRegistrationForm;
