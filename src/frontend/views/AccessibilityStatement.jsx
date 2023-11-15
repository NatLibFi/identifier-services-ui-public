import React from 'react';
import {FormattedMessage} from 'react-intl';

import useDocumentTitle from '/src/frontend/hooks/useDocumentTitle';

import '/src/frontend/css/accessibilityStatement.css';

function AccessibilityStatement () {
  // Set the title of the current page
  useDocumentTitle('accessibilityStatement.title');

  // List of accessibility issues to be displayed
  const issues = ['labels', 'semantics', 'reflow', 'links', 'siteMap', 'titles', 'footer', 'lang', 'batch', 'required'];

  return (
    <div className="accessibilityStatement">
      <h2>
        <FormattedMessage id="accessibilityStatement.title" />
      </h2>

      {/* Introduction */}
      <p>
        <FormattedMessage
          id="accessibilityStatement.description.main"
          values={{
            link: <a href="https://www.w3.org/Translations/WCAG21-fi/">
              <FormattedMessage id="accessibilityStatement.description.main.link" />
            </a>
          }}
        />
      </p>
      <p><FormattedMessage id="accessibilityStatement.description.secondary" /></p>

      {/* Current status of service's accessibility */}
      <h3>
        <FormattedMessage id="accessibilityStatement.status.title" />
      </h3>
      <p><FormattedMessage id="accessibilityStatement.status.description" /></p>

      {/* List of accessibility issues */}
      <h3>
        <FormattedMessage id="accessibilityStatement.issues.title" />
      </h3>
      <h4>
        <FormattedMessage id="accessibilityStatement.issues.disclaimer" />
      </h4>
      <p><FormattedMessage id="accessibilityStatement.issues.disclaimer.description" /></p>

      <h4>
        <FormattedMessage id="accessibilityStatement.issues.list.title" />
      </h4>

      {issues.map((issue, index) => (
        <section key={index}>
          <p><FormattedMessage id={`accessibilityStatement.issues.${issue}.title`} /></p>
          <p><FormattedMessage id="accessibilityStatement.issues.subTitle1" /></p>
          <p><FormattedMessage id={`accessibilityStatement.issues.${issue}.description`} /></p>
          <p><FormattedMessage id="accessibilityStatement.issues.subTitle2" /></p>
          <p><FormattedMessage id={`accessibilityStatement.issues.${issue}.wcag`} /></p>
        </section>
      ))}

      {/* Feedback */}
      <h3>
        <FormattedMessage id="accessibilityStatement.feedback.title" />
      </h3>
      <p><FormattedMessage id="accessibilityStatement.feedback.description" /></p>

      <h4>
        <FormattedMessage id="accessibilityStatement.feedback.contact.title" />
      </h4>
      <p><FormattedMessage id="accessibilityStatement.feedback.contact.email" /></p>

      {/* Control authority */}
      <h3>
        <FormattedMessage id="accessibilityStatement.authority.title" />
      </h3>
      <FormattedMessage
        id="accessibilityStatement.authority.description"
        values={{
          link: <a href="https://www.saavutettavuusvaatimukset.fi/oikeutesi/">
            <FormattedMessage id="accessibilityStatement.authority.description.link" />
          </a>
        }}
      />

      <h4>
        <FormattedMessage id="accessibilityStatement.authority.contact.title" />
      </h4>
      <p><FormattedMessage id="accessibilityStatement.authority.contact.organization" /></p>
      <p><FormattedMessage id="accessibilityStatement.authority.contact.department" /></p>
      <a href="http://www.saavutettavuusvaatimukset.fi/">
        <FormattedMessage id="accessibilityStatement.authority.contact.website" />
      </a>
      <p><FormattedMessage id="accessibilityStatement.authority.contact.email" /></p>
      <p><FormattedMessage id="accessibilityStatement.authority.contact.phone" /></p>
    </div>
  );
}

export default AccessibilityStatement;
