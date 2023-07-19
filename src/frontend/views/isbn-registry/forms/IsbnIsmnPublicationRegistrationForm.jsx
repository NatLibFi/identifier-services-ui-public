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
// Required for FieldArray component to work
import arrayMutators from 'final-form-arrays';
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

import '/src/frontend/css/forms/common.css';
import '/src/frontend/css/forms/isbnIsmnRegistrationForm.css';
import '/src/frontend/css/forms/render/renderContactDetail.css';

import InfoCard from '/src/frontend/components/subComponents/InfoCard.jsx';
import AuthorCard from '/src/frontend/components/subComponents/AuthorCard.jsx';
import EditionInfoCard from '/src/frontend/components/subComponents/EditionInfoCard.jsx';

import FormElement from '/src/frontend/components/form/render/RenderFormElement.jsx';
import {FORMATS, PUBLICATION_TYPES} from '/src/frontend/components/form/constants';
import useDocumentTitle from '/src/frontend/hooks/useDocumentTitle';
import {createRequest} from '/src/frontend/actions';

import FieldArrayElement from '/src/frontend/components/form/isbnIsmnRegistrationForm/FieldArray.jsx';
import {validate} from '/src/frontend/components/form/isbnIsmnRegistrationForm/validation';
import {getFormPages} from '/src/frontend/components/form/isbnIsmnRegistrationForm/content';
import {getSteps} from '/src/frontend/components/form/isbnIsmnRegistrationForm/logic';
import {formatPublicationValues, filterFormFields} from '/src/frontend/components/form/isbnIsmnRegistrationForm/utils';
import Preview from '/src/frontend/components/form/isbnIsmnRegistrationForm/Preview.jsx';

function IsbnIsmnPublicationRegistrationForm (props) {
  const {history, language, configuration, setSnackbarMessage} = props;
  const {disableTurnstile, siteKey} = configuration;

  // Set the title of the current page
  useDocumentTitle('form.isbnIsmn.title');

  const intl = useIntl();

  const [activeStep, setActiveStep] = useState(0);
  const [turnstileId, setTurnstileId] = useState(null);

  // Prevent the view position from freezing in the middle of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleNext(e) {
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
  }

  function handleBack() {
    setActiveStep(activeStep - 1);

    // Scroll to top
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }

  const handlePublicationRegistration = async values => {
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
      const formattedIsbnRequest = {...formatPublicationValues(values, language), turnstileToken};
      await createRequest(formattedIsbnRequest, '/api/public/isbn-registry/requests/publications', history, setSnackbarMessage);
      loading = false; // Sets loading to false to outer scope since API responded to request
    }
  };

  const disableNextButton = ({errors, activeContent}) => {
    // In format selection, we need to make additional test whether additional fields produce errors
    if(activeContent.name === 'formatDetails') {
      if(errors.additionalFormatFields) {
        return true;
      }
    }

    // Return validations regarding current step
    const currentStepKeys = [...activeContent.fields.map(f => f.name), activeContent.name];
    return (Object.keys(errors).some(error => currentStepKeys.includes(error)));
  };

  // Add additional fields to form content depending on publication type and format
  const getActiveArray = (activeContent, values) => {
    // Add additional fields only on format selection step, otherwise return the basic active content
    if(activeContent.fields.find(item => item.name !== 'publicationFormat')) {
      return activeContent.fields;
    }

    // Show no additional fields for dissertation if electronical format is selected
    if(values.publicationType === PUBLICATION_TYPES.DISSERTATION && values.publicationFormat === FORMATS.ELECTRONICAL) {
      return activeContent.fields;
    }

    // If publication type is not dissertation, show different additional fields depending on publication format
    if (values.publicationType !== PUBLICATION_TYPES.DISSERTATION){
      // Additional fields for print format
      const printFields = activeContent.additionalFields.find(f => f.format === FORMATS.PRINT).fields;
      // Additional fields for electronical format
      const electronicalFields = activeContent.additionalFields.find(f => f.format === FORMATS.ELECTRONICAL).fields;

      // Display print additional fields if print format is selected
      if(values.publicationFormat === FORMATS.PRINT) {
        return [...activeContent.fields, ...printFields];
      }

      // Display electronical additional fields if electronical format is selected
      if(values.publicationFormat === FORMATS.ELECTRONICAL) {
        return [...activeContent.fields, ...electronicalFields];
      }

      // Display all additional fields if "Print and electronical" is selected as a publication format
      if(values.publicationFormat === FORMATS.PRINT_ELECTRONICAL) {
        return [...activeContent.fields, ...printFields, ...electronicalFields];
      }
    // If publication type is dissertation and format is print or print and electronical, add additional fields regarding manufacturer
    } else {
      const dissertationAdditionalFields = activeContent.additionalFields.find(f => f.name === 'dissertationAdditionalFields').fields;

      // Display edition field if publication format is either print or print and electronical
      if(values.publicationFormat === FORMATS.PRINT || values.publicationFormat === FORMATS.PRINT_ELECTRONICAL) {
        return [...activeContent.fields, ...dissertationAdditionalFields];
      }
    }

    return activeContent.fields;
  };

  const handlePreviewValues = (values, changeValue) => {
    // If type is PRINT, remove electronical format values
    if (values.publicationFormat === FORMATS.PRINT) {
      changeValue('fileformat', undefined);
      changeValue('fileformatOther', undefined);
    }
    // If type is ELECTRONICAL, remove print format values
    else if (values.publicationFormat === FORMATS.ELECTRONICAL) {
      changeValue('type', undefined);
      changeValue('typeOther', undefined);
      changeValue('printingHouse', undefined);
      changeValue('printingHouseCity', undefined);
      changeValue('copies', undefined);
    }

    // If there is no typeOther value, remove it from the form
    if(!values.type?.some(v => v.value === 'OTHER_PRINT')) {
      changeValue('typeOther', undefined);
    }
    // If there is no fileformatOther value, remove it from the form
    if (!values.fileformat?.some(v => v.value === 'OTHER')) {
      changeValue('fileformatOther', undefined);
    }

    return values;
  };

  return (
    <Form
      onSubmit={handlePublicationRegistration}
      validate={(values) => validate(values)}
      mutators={{...arrayMutators}}
    >
      {({handleSubmit, errors, valid, values, form, submitting}) => {
        // Form field content
        const formPages = getFormPages(values);
        const content = filterFormFields(formPages, values);
        const contentOrder = getSteps(values);
        const activeContent = content[contentOrder[activeStep]];

        const isPreviewPage = activeStep === contentOrder.length - 1;

        return (
          <form className={activeStep === 8 ? 'container' : 'wideContainer'} onSubmit={handleSubmit}>
            <div className='topSticky'>
              <Typography variant="h2" className='normalTitle'>
                <FormattedMessage id="form.isbnIsmn.title"/>
              </Typography>
              {/* Normal Stepper is visible when screen > 1100px */}
              <Stepper
                alternativeLabel
                activeStep={activeStep}
                className='basicStepperStyle'
              >
                {contentOrder.map(label => (
                  <Step key={label}>
                    <StepLabel className='stepLabelContainer'>
                      {intl.formatMessage({id: `form.isbnIsmn.stepper.label.${label}`})}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              {/* Mobile Stepper is visible when screen < 1100px */}
              <MobileStepper
                variant="dots"
                steps={contentOrder.length + 1}
                position="static"
                activeStep={activeStep}
                className='mobileStepperStyle'
                nextButton={
                  activeStep === contentOrder.length - 1
                    ? (
                      <Button
                        type="submit"
                        disabled={!valid || submitting}
                        size="small"
                      >
                        <FormattedMessage id="form.button.label.submit"/>
                        <KeyboardArrowRight/>
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        /* Checking if there are any errors related to the current page's content in the errors object (object comes from validation).
                        Button is disabled until there are no errors - every required field is filled and no validaton errors exist. */
                        disabled={disableNextButton({errors, activeContent})}
                        onClick={handleNext}
                      >
                        <FormattedMessage id="form.button.label.next"/>
                        <KeyboardArrowRight/>
                      </Button>)
                }
                backButton={
                  <Button size="small" disabled={activeStep === 0 || submitting} onClick={handleBack}>
                    <KeyboardArrowLeft/>
                    <FormattedMessage id="form.button.label.back"/>
                  </Button>
                }
              />
            </div>
            <div className={(activeStep === 0 || activeStep === 4 || activeStep === 8) ? '' : 'subContainer'}>
              <Grid
                container
                spacing={2}
                direction={activeStep === content.length - 1 ? 'row' : 'column'}
                className={activeStep === 4 ? 'addAuthorsContainer' : ''}
              >
                {activeContent?.renderType === 'element'
                  && <FormElement
                    array={getActiveArray(activeContent, values)}
                    publicationIsbnValues={values}
                    intl={intl}
                  />
                }
                {activeContent?.renderType === 'fieldArray'
                  && <FieldArrayElement
                    name={activeContent.name}
                    content={activeContent.fields}
                    formValues={values}
                    intl={intl}
                    changeFormFields={form.change}
                  />
                }
                {/* Showing an info message if user has selected that the publication is not public */}
                {(activeContent?.renderType === 'element' && activeContent?.fields.some(field => field.name === 'publicationsPublic'))
                  && values?.publicationsPublic === 'false'
                  && <InfoCard
                    infoText="form.isbnIsmn.card.publicationIsPublic"
                    cardStyle='isPublicInfoCardContainer'
                    textStyle='infoCardWarning'/>
                }
                {/* Instruct user to find out if he can obtain ID from his own department (showing if a dissertation is chosen as a publication type) */}
                {(activeContent?.renderType === 'element' && activeContent?.fields.some(field => field.name === 'publicationType'))
                  && values.publicationType === PUBLICATION_TYPES.DISSERTATION
                  && <InfoCard
                    infoText="form.isbnIsmn.card.otherUniversity"
                    cardStyle='dissertationInfoCardContainer'
                    textStyle='infoCardTextBold'/>
                }
                {/* Brief reminder to check if it is possible to obtain an ID from users own department */}
                {(activeContent?.renderType === 'element' && activeContent?.fields.some(field => field.name === 'isHelsinki'))
                  && values.isHelsinki
                  && <InfoCard infoText="form.isbnIsmn.card.universityOfHelsinki" cardStyle='dissertationInfoCardContainer'/>
                }
                {(activeContent?.renderType === 'element' && activeContent?.fields.some(field => field.name === 'publicationYear'))
                  && <InfoCard infoText="form.isbnIsmn.card.publicationInfo" cardStyle='dissertationInfoCardContainer'/>
                }
                {/* Info card with the link to the publication edition info page */}
                {(activeContent?.renderType === 'element' && activeContent?.fields.some(field => field.name === 'edition'))
                  && <EditionInfoCard infoText="form.isbnIsmn.card.editionInfo" language={language}/>
                }
                {(activeContent?.renderType === 'element' && activeContent?.fields.some(field => field.name === 'series'))
                  && <InfoCard infoText="form.isbnIsmn.card.seriesInfo" cardStyle='dissertationInfoCardContainer'/>
                }
                {/* Display added authors if in author page */}
                {(activeContent?.renderType === 'fieldArray' && activeContent?.name === 'authors') &&
                  <div className='renderAuthorsContainer'>
                    {/* Displaying different messages depending on amount of added authors */ }
                    <Typography>
                      {!values.authors?.length && <FormattedMessage id="form.isbnIsmn.authors.card.noAuthors"/>}
                      {values.authors?.length > 0 && values.authors?.length < 4 && <FormattedMessage id="form.isbnIsmn.authors.card.addMoreAuthors"/>}
                      {values.authors?.length > 3 && <FormattedMessage id="form.isbnIsmn.authors.card.maxAuthors"/>}
                    </Typography>
                    <AuthorCard authors={values.authors} handleRemove={index => form.change('authors', values.authors.filter((_, i) => i !== index))}/>
                  </div>
                }
                {/* Render the preview of a form with the data passed by user */}
                {isPreviewPage && <Preview values={handlePreviewValues(values, form.change)} intl={intl}/>}
              </Grid>

              {/* Required for turnstile */}
              <div id={'turnstileWidget'} style={{textAlign: 'center'}}>
                {/* Display loading when loading */}
                {submitting && <CircularProgress/>}
              </div>

              <div className={isPreviewPage ? 'formSubmitButtonsContainer' : 'formButtonsContainer'}>
                <Button
                  disableRipple
                  disabled={activeStep < 1 || submitting}
                  onClick={handleBack}
                >
                  <FormattedMessage id="form.button.label.back"/>
                </Button>
                {activeStep !== contentOrder.length - 1 &&
                  <Button
                    disableRipple
                    variant="contained"
                    color="primary"
                    /* Checking if there are any errors related to the current page's content in the errors object (object comes from validation).
                    Button is disabled until there are no errors - every required field is filled and no validaton errors exist. */
                    disabled={disableNextButton({errors, activeContent})}
                    onClick={handleNext}
                  >
                    <FormattedMessage id="form.button.label.next"/>
                  </Button>
                }
                {isPreviewPage && (
                  <Button
                    disableRipple
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!valid || submitting}
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

IsbnIsmnPublicationRegistrationForm.propTypes = {
  history: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  configuration: PropTypes.object.isRequired,
  setSnackbarMessage: PropTypes.func.isRequired
};

export default IsbnIsmnPublicationRegistrationForm;
