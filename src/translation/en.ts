const en = {
  // Errors
  'errors.unknown.title': 'Application has encountered an error',
  'errors.unknown':
    'Application has encountered an unexpected error. Please try again later. If the problem persists, please contact customer service.',
  'errors.api.generic': 'Application has encountered an unexpected error. Please try again later.',
  'errors.api.turnstile': 'An unexpected error occurred during bot identification process. Please try again.',
  'errors.api.unknown': 'Application has encountered an unexpected error. Please try again later.',

  'errors.turnstile-load-failed':
    'An unexpected error occurred during loading bot identification process. Please try again later.',

  'errors.instructions.generic': 'If the problem persists, please contact customer service',

  // Pages

  // Pages - Home
  'pages.home.titles.main': 'ISBN, ISMN and ISSN',
  'pages.home.infoboxes.box1-1':
    'International standard identifiers (ISBN, ISSN and ISMN) uniquely identify publications.',
  'pages.home.infoboxes.box1-2':
    "Identifiers are used, for example, in publishing industry's ordering and distribution systems.", // eslint-disable-line quotes
  'pages.home.infoboxes.box2': 'ISBN identifies books, ISMN notated music publications and ISSN serial publications.',
  'pages.home.infoboxes.box3-1':
    'In Finland, these identifiers are applied for from the Finnish ISBN and ISSN Agencies operating at the National Library of Finland.',
  'pages.home.infoboxes.box3-2': 'The identifiers are free of charge.',

  'pages.home.form-instructions.title': 'Instructions for completing the forms',
  'pages.home.form-instructions.text1':
    'If you publish regularly (for example, one or more publications a year) and you are not yet a member of the ISBN/ISMN system, please complete both the electronic publisher registration form (ISBN/ISMN) and the ISBN/ISMN application form.',
  'pages.home.form-instructions.text2':
    'If your publishing activities are occasional or you have already joined the ISBN/ISMN system, please complete the ISBN/ISMN application for books and sheet music only.',
  'pages.home.form-instructions.text3':
    "Information on publishers entered in the ISBN/ISMN system is published in the international databases Global Register of Publishers and/or Music Publishers' International ISMN Database. This information is also used by the Finnish ISBN Agency and published on its website.", // eslint-disable-line quotes

  'pages.home.isbn-ismn-info.title': 'ISBN and ISMN',
  'pages.home.isbn-ismn-info.text1':
    'An ISBN identifies books and an ISMN identifies notated music publications intended for public use. The Finnish national ISBN Agency is responsible for handing out ISBNs and ISMNs in Finland. The Agency maintains a national publisher register and provides information about Finnish publishers for national and international use.',
  'pages.home.isbn-ismn-info.text2':
    "Identifiers as a part of metadata serve the publishing industry and the library sector in their entirety, supporting identification, processing and availability of publications. Identifiers are used, for example, in publishing industry's ordering and distribution systems to speed up the identification of publications - as well as in international and domestic joint catalogues, bibliographies, library lending systems and information retrieval.", // eslint-disable-line quotes
  'pages.home.isbn-ismn-info.text3':
    "Each book or sheet music publication, each different publication form (printed, audio-visual, digital) and each edition containing changes are issued a separate ISBN or ISMN. This promotes identification of publications in the publishing industry's distribution chain and ensures that customers get the desired publication at their disposal. Publication format may be a printed book or an audio-visual or electronic recording.", // eslint-disable-line quotes

  'pages.home.isbn-ismn-info.isbn-link': 'More about ISBN',
  'pages.home.isbn-ismn-info.ismn-link': 'More about ISMN',

  'pages.home.issn-info.title': 'ISSN',
  'pages.home.issn-info.text1':
    'An ISSN identifies continuously published publications, such as journals and series. The Finnish national ISSN Agency is responsible for providing the identifiers in Finland and sends the information about publications that have received an ISSN to the ISSN Portal database.',
  'pages.home.issn-info.text2':
    'Identifiers as a part of metadata serve the publishing industry and the library sector in their entirety, supporting identification, processing and availability of publications.',
  'pages.home.issn-info.text3':
    "Identifiers are used, for example, in publishing industry's ordering and distribution systems to speed up the identification of publications as well as in international and domestic joint catalogues, bibliographies, library lending systems and information retrieval. An ISSN is inseparable from the title of the publication; if the title of the publication changes, the identifier must also be changed. A separate ISSN is given to different forms of publication.", // eslint-disable-line quotes
  'pages.home.issn-info.kk-issn-link': 'More about ISSN',
  'pages.home.issn-info.issn-portal-link': 'ISSN-portal database',

  // Pages - Monograph Publisher Search
  'pages.publisher-registry-search.title': 'Search publisher by name or identifier',
  'pages.publisher-registry-search.input': 'Search..',

  // Pages - Monograph Publisher
  'pages.monograph-publisher.heading': 'Publisher',

  'pages.monograph-publisher.previous-names': 'Previous names',
  'pages.monograph-publisher.has-quitted': 'publishing activity terminated',
  'pages.monograph-publisher.headings.isbn-publisher-ranges': 'Publisher identifiers (ISBN)',
  'pages.monograph-publisher.headings.ismn-publisher-ranges': 'Publisher identifiers (ISMN)',

  // Pages - Identifier Batch Download
  'pages.identifierbatch-download.title': 'List of identifiers',

  // Pages- Accessibility Statement
  'pages.accessibility-statement.title': 'Accessibility statement',
  'pages.accessibility-statement.description.main':
    'This accessibility statement on the identifier portal service was created on 9 May 2023 (with a subsequent update on 11 December 2025). The service is governed by the Act on the Provision of Digital Services (306/2019), which requires that public online services be accessible. The accessibility requirements indicated in the statement are listed in the official Web Content Accessibility Guidelines.',
  'pages.accessibility-statement.description.main.link': 'Web Content Accessibility Guidelines (WCAG) version 2.1',
  'pages.accessibility-statement.description.secondary':
    'We have assessed the accessibility of the service independently.',
  'pages.accessibility-statement.status.title': 'The accessibility status of the digital service',
  'pages.accessibility-statement.status.description': 'The service partly meets the accessibility requirements.',
  'pages.accessibility-statement.issues.title': 'Non-accessible content',
  'pages.accessibility-statement.issues.disclaimer': 'Disproportionate burden',
  'pages.accessibility-statement.issues.disclaimer.description':
    'As the redesign of the service remains incomplete in some areas, deficiencies in its usability may occur. If the user cannot retrieve the desired information using the current user interface or submit applications related to identifiers, requests for information and applications can be sent to isbn-keskus@helsinki.fi.',
  'pages.accessibility-statement.issues.subTitle1': 'Inaccessible content and related deficiencies',
  'pages.accessibility-statement.issues.subTitle2': 'Accessibility criteria not met',
  'pages.accessibility-statement.issues.list.title': 'The website does not yet fully comply with all requirements.',
  'pages.accessibility-statement.issues.sitemap.title': 'Operable: Missing site map',
  'pages.accessibility-statement.issues.sitemap.description':
    'There is currently only one way to locate individual web pages, namely, the navigation menu.',
  'pages.accessibility-statement.issues.sitemap.wcag': '2.4.5 Multiple Ways',
  'pages.accessibility-statement.issues.batch.title':
    'Understandable: Lang attributes missing in the text of the info pop-up on the identifier list page',
  'pages.accessibility-statement.issues.batch.description':
    'The info pop-up on individual identifier list pages contains text in three languages, each of which should be labelled separately with a lang attribute.',
  'pages.accessibility-statement.issues.batch.wcag': '3.1.2 Language of Parts',
  'pages.accessibility-statement.issues.required.title': 'Understandable: HTML required attributes missing',
  'pages.accessibility-statement.issues.required.description':
    'Required fields in forms can be indicated using the required attribute in HTML. An explanation must also be added to the forms, for example ‘* – required fields’.',
  'pages.accessibility-statement.issues.required.wcag': '3.3.2 Labels or Instructions',
  'pages.accessibility-statement.feedback.title': 'Did you notice an accessibility issue in our digital service?',
  'pages.accessibility-statement.feedback.description': 'Tell us about it and we will do our best to rectify it.',
  'pages.accessibility-statement.feedback.contact.title': 'Email',
  'pages.accessibility-statement.feedback.contact.email': 'isbn-keskus@helsinki.fi',
  'pages.accessibility-statement.authority.title': 'Supervisory authority',
  'pages.accessibility-statement.authority.description':
    'If you notice accessibility issues on the website, first leave your feedback with us, the administrators of the website. It may take up to 14 days to receive an answer. If you are not satisfied with the answer or do not receive an answer from us within two weeks, you may submit a complaint to the Digital Accessibility Supervision Unit of the Finnish Transport and Communications Agency Traficom. The Traficom website has detailed instructions on how to submit a complaint and how the issue will be handled.',
  'pages.accessibility-statement.authority.description.link':
    'Digital Accessibility Supervision Unit of the Finnish Transport and Communications Agency Traficom',
  'pages.accessibility-statement.authority.contact.title': 'Contact information of the supervisory authority',
  'pages.accessibility-statement.authority.contact.organization':
    'Finnish Transport and Communications Agency Traficom',
  'pages.accessibility-statement.authority.contact.department': 'Digital Accessibility Supervision Unit',
  'pages.accessibility-statement.authority.contact.website': 'www.saavutettavuusvaatimukset.fi',
  'pages.accessibility-statement.authority.contact.email': 'saavutettavuus(at)traficom.fi',
  'pages.accessibility-statement.authority.contact.phone': 'phone (switchboard) 029 534 5000',

  // Pages- Privacy Policy
  'pages.privacy-policy.title': 'Privacy policy',
  'pages.privacy-policy.1a.title': '1a. Data file controller',
  'pages.privacy-policy.1a.content':
    'The National Library of Finland\nLibrary network services\nP.O. Box 15 (Unioninkatu 36)\n00014 University of Helsinki\nTelephone 02941 911',
  'pages.privacy-policy.1b.title': '1b. Data protection officer',
  'pages.privacy-policy.1b.content':
    'The National Library of Finland is an independent institute at the University of Helsinki. The data protection officer of the University of Helsinki can be reached by email at tietosuoja(at)helsinki.fi.',
  'pages.privacy-policy.2.title': '2. Contact information for questions about data processing',
  'pages.privacy-policy.2.content': 'isbn-keskus(at)helsinki.fi',
  'pages.privacy-policy.3.title': '3. Name of data file',
  'pages.privacy-policy.3.content': 'Identifier portal',
  'pages.privacy-policy.4.title': '4. Purpose and justification for processing personal data',
  'pages.privacy-policy.4.content':
    'Personal data are processed to distinguish between individual customers and to identify users logged in to various services in the identifier portal. Personal data are also processed in the assignment process for IBSN, ISMN and ISSN identifiers for the unique identification of publishers and the maintenance of publisher registers. In addition, data are processed to investigate potential errors and misconduct. The personal data of users with administrator privileges are processed to verify system activity data.\n\nSince the publisher prefix included in ISBN identifiers identifies individual publishers, national and international registers are needed to maintain this information. The publisher register is primarily used as a tool by the Finnish national ISBN Agency to contact publishers or, in unclear cases, to determine which publisher has published a certain publication. The data are also available in international ISBN and ISMN registers.\n\nInformation (e.g., IP and URL addresses) on users logging in to the service will be temporarily stored for processing.\n\nThe grounds for the processing of personal data is the legitimate interest of the controller. One of the duties of the ISBN Agency as a national registry authority is to publish a database enabling searches for granted ISBN identifiers or publisher codes. This helps promote the use of the ISBN standard and makes it easier to find publishers and their books. For monitoring and managing the capacity of the ISBN system, the International ISBN Agency must also have up-to-date information on the assigned ISBN identifiers. The International ISBN Agency receives information on assigned identifiers from the national agencies.',

  'pages.privacy-policy.5.title': '5. Content of the data file',
  'pages.privacy-policy.5.prefix': 'For this purpose, we process the following personal data:',
  'pages.privacy-policy.5.publisher-information': 'Basic publisher details',
  'pages.privacy-policy.5.publisher-information.language': 'Language',
  'pages.privacy-policy.5.publisher-information.name': 'Name',
  'pages.privacy-policy.5.publisher-information.contact-person-info':
    'Names, phone numbers and email addresses of contact persons',
  'pages.privacy-policy.5.publisher-information.address': 'Address',
  'pages.privacy-policy.5.publisher-information.other-names': 'Previous names and other names of the publisher',
  'pages.privacy-policy.5.publisher-information.publisher-identifier': 'Publisher code(s)',
  'pages.privacy-policy.5.publisher-information.additionaI-information':
    'Information entered separately by the user in the field for additional information',
  'pages.privacy-policy.5.publisher-information.publisher-classification': 'Publishing subject matter',
  'pages.privacy-policy.5.publication-information': 'Basic publication details',
  'pages.privacy-policy.5.publication-information.publisher-name': 'Name of the publisher',
  'pages.privacy-policy.5.publication-information.publisher-email': 'Email of the publisher',
  'pages.privacy-policy.5.publication-information.publisher-address': 'Address details of the publisher',
  'pages.privacy-policy.5.publication-information.publisher-contact-person': 'Name of contact person for the publisher',
  'pages.privacy-policy.5.publication-information.publisher-phone': 'Phone number of the publisher',
  'pages.privacy-policy.5.publication-information.author-information': 'Names and roles of the authors',
  'pages.privacy-policy.5.superuser-information': 'Basic superuser details ',
  'pages.privacy-policy.5.superuser-information.name': 'Name',
  'pages.privacy-policy.5.superuser-information.username': 'Username',
  'pages.privacy-policy.5.superuser-information.password': 'Password',
  'pages.privacy-policy.5.superuser-information.personal-settings': 'Personal user settings',
  'pages.privacy-policy.5.superuser-information.email': 'Email',
  'pages.privacy-policy.5.personalization': 'Data collected for personalized services',
  'pages.privacy-policy.5.personalization.settings': 'Personal user settings (e.g., interface language selection)',
  'pages.privacy-policy.5.other': 'Other information',
  'pages.privacy-policy.5.other.mandatoryInfo': 'Information necessary for utilising the online service',
  'pages.privacy-policy.5.other.error-and-misconduct-info':
    'Information necessary for investigating errors and misconduct',
  'pages.privacy-policy.5.suffix':
    'The National Library of Finland does not use the collected data for marketing purposes.',

  'pages.privacy-policy.6.title': '6. Regular sources of data',
  'pages.privacy-policy.6.content':
    'The data in the data file are stored when publishers join the ISBN or ISMN system, or when applying for ISBN or ISMN identifiers on the basis of information entered by the user. Contact details are compiled from the information provided by the publishers.\n\nUsers independently store the data in the identifier portal. The data can also be stored in the data file by system administrators when users interact with the ISBN Agency or the ISSN Agency by email or phone. Data on journal publishers in the ISSN register are regularly supplemented by collecting information from public sources.\n\nData on operations carried out by system administrators are stored on the basis of the functions carried out by them.\n\nData on the use of personalised functions are stored by users.',
  'pages.privacy-policy.7.title': '7. Processing and protection of sensitive personal data',
  'pages.privacy-policy.7.content': 'No sensitive personal data are processed in the identifier portal.',
  'pages.privacy-policy.8.title': '8. Disclosure of data',
  'pages.privacy-policy.8.content':
    'Every year, publisher data are sent to the Global Register of Publishers maintained by the International ISBN Agency. Every year, data on publishers of sheet music are sent to the International Music Publishers’ Database maintained by the International ISMN Agency. Limited publisher details (official name, street address, city, postal code, phone number and web address) are publicly available online in a publisher register maintained by the Finnish ISBN Agency.\n\nData related to publications (e.g., title, publication date, identifiers, publisher and authors) are forwarded to the Melinda metadata repository and the library system of the National Library of Finland, after which they will be publicly available. In the case of ISSN publications, the metadata will be forwarded separately to the ISSN International Centre.\n\nThe technical log data of the website’s communications are partially stored in the services provided by Cloudflare Inc, a contracting partner of the National Library. Cloudflare processes data in the European Economic Area (EEA) and the United States. The grounds for the transfer of personal data are standard contractual clauses approved by the European Commission.',
  'pages.privacy-policy.9.title': '9. Technical log data for the website and telecommunication',
  'pages.privacy-policy.9.content':
    'Technical log data are collected on service users for the purposes of service provision and information security. Log data include information, such as time stamps, browser versions, operating systems and IP addresses, which can be used to connect individual users to natural persons. The above information is only used to investigate errors or information security incidents. The temporary storage of personal data included in the log data is necessary for service provision.\n\nThe National Library’s contracting partner Cloudflare Inc collects log data related to the services it provides in terms of the Cloudflare services used in the identifier portal. The data include information, such as time stamps and IP addresses, which can be used to connect individual users to natural persons.',
  'pages.privacy-policy.10.title': '10. Duration of personal data storage and removal of unnecessary personal dat',
  'pages.privacy-policy.10.content':
    'Personal data processed in the assignment process for ISBN, ISMN and ISSN identifiers as well as personal data in publisher registers are stored in accordance with the specifications in their descriptions of data files. Data are stored permanently in the data file. Contact details can be changed or erased on request. The personal data of National Library employees will be erased one year after the termination of employment.',
  'pages.privacy-policy.11.title': '11. What rights do you have?',
  'pages.privacy-policy.11.part1.boldContent': 'Right to access and rectify personal data',
  'pages.privacy-policy.11.part1.content':
    'You have the right to know whether the National Library of Finland is processing your personal data.\n\nYou have the right to know also which such personal details are being processed.\n\nIf you wish to know even more specifically which personal details are being processed, please write to isbn-keskus(at)helsinki.fi\n\n',
  'pages.privacy-policy.11.part2.boldContent': 'Right to lodge a complaint with a supervisory authority',
  'pages.privacy-policy.11.part2.content':
    'You have the right to subject the legality of the University’s activities to a review by the Data Protection Ombudsman.\n\n',
  'pages.privacy-policy.11.part3.boldContent': 'Right to erasure',
  'pages.privacy-policy.11.part3.content':
    'You have the right to request the erasure of your personal data by writing to isbn-keskus(at)helsinki.fi',
  'pages.privacy-policy.12.title': '12. Principles of data security',
  'pages.privacy-policy.12.content':
    'The data are recorded exclusively in electronic format. Only system and other administrators, authenticated by personal usernames and passwords, may access protected data. Public information is accessible on the public web.',
  'pages.privacy-policy.13.title': '13. Transfer of data outside the EU or the European Economic Area',
  'pages.privacy-policy.13.content':
    'Every year, publisher data are sent to the Global Register of Publishers maintained by the International ISBN Agency in London. Every year, data on publishers of sheet music are sent to the International Music Publishers’ Database maintained by the International ISMN Agency in Berlin. Limited publisher details (official name, street address, city, postal code, phone number, publisher codes and web address) are publicly available online in a publisher register maintained by the Finnish national ISBN Agency.\n\nIn the case of services provided by the National Library’s contracting partner Cloudflare, the necessary data can be transferred outside the EU or the EEA, as defined in section 9 (‘Technical log data for the website and telecommunications’).\n\nApart from the above-mentioned exceptions, data will not be transferred outside the European Union or the European Economic Area.',
  'pages.privacy-policy.14.title': '14. Automated decision-making and profiling',
  'pages.privacy-policy.14.content':
    'The processing does not involve automated profiling on the basis of your personal data.',

  // Pages - Form success
  'pages.form-success.to-frontpage': 'To frontpage',

  'pages.form-success.forms.monograph-publisher.title': 'Request sent successfully',
  'pages.form-success.forms.monograph-publisher.description':
    'Estimated processing time of the request is a few weekdays days on average. In case additional details are required to process the application, we will contact you via email or by phone.',

  'pages.form-success.forms.monograph-publication.title': 'Request sent successfully',
  'pages.form-success.forms.monograph-publication.description':
    'Estimated processing time of the request is a few weekdays days on average. In case additional details are required to process the application, we will contact you via email or by phone.',

  'pages.form-success.forms.serial-publication.title': 'Request sent successfully',
  'pages.form-success.forms.serial-publication.description':
    'Estimated processing time of the request is a few weekdays days on average. In case additional details are required to process the application, we will contact you via email or by phone.',

  // Pages - Maintenance
  'pages.maintenance.ongoing-maintenance': 'Service is under maintenance.',
  'pages.maintenance.try-again-later': 'Try again later.',

  // Pages - Not Found
  'pages.not-found.not-found-title': 'Page not found (404)',
  'pages.not-found.not-found-message':
    'Unfortunately the page you are looking for does not exist or is moved elsewhere.',

  // Forms
  'forms.guide.star': 'Fields marked with asterisk (*) are required',
  'forms.submit-search': 'Search',
  'forms.submit': 'Submit',

  // Forms aria-label
  'forms.aria-label.next': 'Next',
  'forms.aria-label.previous': 'Previous',
  'forms.aria-label.search': 'Search',

  // Form errors
  'forms.errors.common.required': 'Required',
  'forms.errors.common.year-format': 'Enter year using four digits',
  'forms.errors.common.month-format': 'Enter month using two digits',
  'forms.errors.common.issn-format': 'Enter ISSN in correct format (e.g., 1234-4321)',
  'forms.errors.common.zip-format': 'Zip should contain exactly five digits (e.g., 00014)',
  'forms.errors.common.www-format':
    'Enter full URL including either http:// or https:// (e.g., https://www.kansalliskirjasto.fi)',
  'forms.errors.common.min-length': 'Input is too short',
  'forms.errors.common.max-length': 'Input is too long',
  'forms.errors.common.phone-format':
    'Phone number may only include digits, space, plus-symbol (+) and minus-symbol (-)',
  'forms.errors.common.integer-only': 'Only digits are allowed (e.g., 10)',
  'forms.errors.common.integer-dash-only': 'Only digits and dashes are allowed (e.g., 10-20)',
  'forms.errors.twodigit-integer-only': 'Enter value as two-digit number (e.g., 10)',
  'forms.errors.monograph-publications.require-public':
    'Identifiers are only granted for publications intended for public use. If your publication is intended for private use only (e.g., for friends, family or the internal use of an association or organisation), publication will not be assigned an ISBN or ISMN identifier.',
  'forms.errors.common.max-entries': 'Too many selected values',

  // Form errors - Monograph publication request
  'forms.errors.monograph-publications.publication-date':
    'An ISBN or ISMN cannot be requested after the book is printed, or published online.',
  'forms.errors.monograph-publications.publisher-identifier-format':
    'Please enter publisher identifier in correct format (e.g., 978-952-12345)',
  'forms.errors.monograph-publications.already-published':
    'An ISBN or ISMN cannot be requested after the book is printed, or published online',

  // Forms - terms and conditions (cloudflare)
  'components.form-terms-and-conditions.title': 'Important note',
  'components.form-terms-and-conditions.common':
    'By proceeding to complete this form you agree and consent that the site is protected by an automated detection service to distinguish human users from bot users. In the process, the service provider (Cloudflare) receives information on your IP-address.',
  'components.form-terms-and-conditions.download':
    'By proceeding to download the identifiers you agree and consent that the site is protected by an automated detection service to distinguish human users from bot users. In the process, the service provider (Cloudflare) receives information on your IP-address.',
  'components.form-terms-and-conditions.links.cf-privacy-policy': 'Cloudflare privacy policy',
  'components.form-terms-and-conditions.links.cf-terms-of-use': 'Cloudflare terms of use',
  'components.form-terms-and-conditions.accept': 'Accept and continue',
  'components.form-terms-and-conditions.show': 'Go back',

  // Forms - terms and conditions (monograph publisher)
  'components.form-terms-and-conditions.monograph-publishers.title':
    'When joining the ISBN system, the publisher commits to the following obligations:',
  'components.form-terms-and-conditions.monograph-publishers.responsibility-1':
    'An ISBN must appear on all the publications published.',
  'components.form-terms-and-conditions.monograph-publishers.responsibility-2':
    "The ISBN should be printed as advised on the ISBN Agency's website.", // eslint-disable-line quotes
  'components.form-terms-and-conditions.monograph-publishers.responsibility-3':
    'The publisher keeps a list of its publications sorted according to their ISBN numbers.',
  'components.form-terms-and-conditions.monograph-publishers.responsibility-4':
    'The publisher will send a copy of each publication to the Finnish ISBN Agency immediately after publication.',
  'components.form-terms-and-conditions.monograph-publishers.responsibility-5':
    "Entered publisher information is published in the international databases Global Register of Publishers and/or Music Publishers' International ISMN Database. The information is also used by the Finnish ISBN Agency and published on its website.", // eslint-disable-line quotes

  // Forms - terms and conditions (monograph publication)
  'components.form-terms-and-conditions.monograph-publications.title1': '', // TODO this + note
  'components.form-terms-and-conditions.monograph-publications.note1': '',

  'components.form-terms-and-conditions.monograph-publications.title2':
    'When applying ISBN or ISMN, publisher commits to the following obligations:',
  'components.form-terms-and-conditions.monograph-publications.responsibility-1':
    "Entered publisher information is published in the international databases Global Register of Publishers and/or Music Publishers' International ISMN Database.", // eslint-disable-line quotes
  'components.form-terms-and-conditions.monograph-publications.responsibility-2':
    'Entered information is also used by the Finnish ISBN Agency and published on its website.',

  // Forms - terms and conditions (serial publication)
  'components.form-terms-and-conditions.serial-publications.title': 'Note the following when submitting a request',
  'components.form-terms-and-conditions.serial-publications.subtitle1': 'Maximum number of publications',
  'components.form-terms-and-conditions.serial-publications.subtitle2': 'Publication in several languages',
  'components.form-terms-and-conditions.serial-publications.subtitle3': 'Publication in several media',

  'components.form-terms-and-conditions.serial-publications.paragraph1':
    'You can request an ISSN for a maximum of four publications with a single ISSN application form. If you need ISSNs for a larger number of publications, please contact the ISSN Agency.',
  'components.form-terms-and-conditions.serial-publications.paragraph2':
    'If the same publication is issued in several languages and if the language version has its own separate numbering, the language version needs an ISSN of its own. Enter details on each language version separately by choosing the correct amount of publication versions.',
  'components.form-terms-and-conditions.serial-publications.paragraph3':
    'If the same publication is regularly issued in another form/medium (print, online), it will need its own ISSN. Enter details on each form/medium separately by choosing the correct amount of publication versions.',

  'components.form-terms-and-conditions.serial-publications.note':
    'Please request ISSN for online version when the publication is online, or ready for publication.',

  // Forms - common
  'forms.common.fields.boolean.true': 'Yes',
  'forms.common.fields.boolean.false': 'No',

  'forms.common.fields.language-code': 'Customer service language',
  'forms.common.fields.language-code.fi-FI': 'Finnish',
  'forms.common.fields.language-code.sv-SE': 'Swedish',
  'forms.common.fields.language-code.en-GB': 'English',

  'forms.common.fields.contact-person': 'Contact person',
  'forms.common.fields.contact-person.placeholder': 'e.g., Matti Meikäläinen',

  'forms.common.fields.official-name': 'Publisher name',
  'forms.common.fields.official-name.placeholder': 'e.g., Kustantamo Oy tai Matti Meikäläinen',

  'forms.common.fields.address': 'Address',
  'forms.common.fields.address.placeholder': 'e.g., Esimerkkikatu 1',

  'forms.common.fields.zip': 'Postal code',
  'forms.common.fields.zip.placeholder': 'e.g., 00014',

  'forms.common.fields.city': 'City',
  'forms.common.fields.city.placeholder': 'e.g., Helsinki',

  'forms.common.fields.phone': 'Phone number',
  'forms.common.fields.phone.placeholder': 'e.g., 0401234567',

  'forms.common.fields.email': 'Email',
  'forms.common.fields.email.placeholder': 'e.g., matti.meikalainen@example.com',

  'forms.common.fields.language': 'Language of publication',
  'forms.common.fields.language.placeholder': 'Choose language',
  'forms.common.fields.language.FIN': 'Finnish',
  'forms.common.fields.language.SWE': 'Swedish',
  'forms.common.fields.language.ENG': 'English',
  'forms.common.fields.language.SMI': 'Sami',
  'forms.common.fields.language.SPA': 'Spanish',
  'forms.common.fields.language.FRE': 'French',
  'forms.common.fields.language.GER': 'German',
  'forms.common.fields.language.RUS': 'Russian',
  'forms.common.fields.language.MUL': 'Other/bilingual',

  'forms.common.fields.series-name': 'Series',
  'forms.common.fields.series-name.placeholder': 'e.g., Tietolinja',
  'forms.common.fields.series-volume': 'Volume',
  'forms.common.fields.series-volume.placeholder': 'e.g., 1/2025',
  'forms.common.fields.issn': 'ISSN',
  'forms.common.fields.issn.placeholder': 'e.g., 1239-9132',

  'forms.common.fields.select.placeholder': 'Choose option',

  // Forms - Monograph Publisher registration
  'forms.monograph-publishers.title': 'Publisher registration form',
  'forms.monograph-publishers.headings.name': 'PUBLISHER NAME INFORMATION',
  'forms.monograph-publishers.headings.basic-information': 'PUBLISHING INFORMATION',
  'forms.monograph-publishers.headings.contact-information': 'CONTACT INFORMATION',
  'forms.monograph-publishers.headings.organization-information': 'ORGANISATIONAL INFORMATION',

  'forms.monograph-publishers.fields.other-name': 'Other names',
  'forms.monograph-publishers.fields.other-name.placeholder': 'e.g., MM-kustantamo',
  'forms.monograph-publishers.fields.other-name.add-guide': 'Add new name',

  'forms.monograph-publishers.fields.add-other-name': 'Add new name',
  'forms.monograph-publishers.fields.max-other-name': 'You may add maximum of four names',

  'forms.monograph-publishers.fields.www': 'Website',
  'forms.monograph-publishers.fields.www.placeholder': 'e.g., https://example.com',

  'forms.monograph-publishers.fields.frequency-current':
    'Please estimate the number of publications you publish this year',
  'forms.monograph-publishers.fields.frequency-current.placeholder': 'e.g., 10',

  'forms.monograph-publishers.fields.frequency-next':
    'Please estimate the number of publications you publish next year',
  'forms.monograph-publishers.fields.frequency-next.placeholder': 'e.g., 10',

  'forms.monograph-publishers.fields.affiliate-of': 'Affiliate of',
  'forms.monograph-publishers.fields.affiliate-of.placeholder': 'e.g., Emo-Yhtiö Oy',

  'forms.monograph-publishers.fields.affiliates': 'Affiliates',
  'forms.monograph-publishers.fields.affiliates.placeholder': 'e.g., Tytär-yhtiö Oy',

  'forms.monograph-publishers.fields.distributors': 'Distributors',
  'forms.monograph-publishers.fields.distributors.placeholder': 'e.g., Jakeluyritys ABCDE',

  'forms.monograph-publishers.fields.distributor-of': 'Distributor of',
  'forms.monograph-publishers.fields.distributor-of.placeholder': 'e.g., ABCDE-yhtiö',

  'forms.monograph-publishers.notes.affiliates':
    'Do you have any affiliated companies in Finland or abroad? Please provide the names and addresses of the companies and an estimate of the annual publication amounts.',
  'forms.monograph-publishers.notes.affiliate-of':
    'Do you have any foreign or Finnish distributors? Please provide the names and addresses of the companies.',

  // Forms - Monograph Publication request
  'forms.monograph-publications.title': 'Apply for ISBN or ISMN identifier',

  // Monograph Publication Request - headings
  'forms.monograph-publications.headings.basic-information': 'BASIC INFORMATION',
  'forms.monograph-publications.headings.publisher-information': 'PUBLISHER INFORMATION',
  'forms.monograph-publications.headings.publication-information': 'PUBLICATION INFORMATION',
  'forms.monograph-publications.headings.contact-information': 'CONTACT INFORMATION',
  'forms.monograph-publications.headings.series-information': 'SERIES INFORMATION',
  'forms.monograph-publications.headings.author-information': 'AUTHOR INFORMATION',
  'forms.monograph-publications.headings.other-information': 'OTHER INFORMATION',

  // Monograph Publication Request - descriptions
  'forms.monograph-publications.descriptions.series-information':
    'Please enter series details if the publication is part of a series.',

  // Monograph Publication Request - notes
  'forms.monograph-publications.notes.dissertation-locality':
    'Before you fill in this ISBN application form, please check at your department/faculty if you get an ISBN from there. If the dissertation is part of a series Dissertationes Universitatis Helsingiensis, please contact Unigrafia. If needed, please contact ISBN Agency for more information.',

  // Monograph Publication Request - Publisher / Publication basic information
  'forms.monograph-publications.fields.publications-public':
    'Publication is intended for public use (e.g., for library use or sale in bookshops)',

  'forms.monograph-publications.fields.publication-type': 'Publication is',
  'forms.monograph-publications.fields.publication-type.placeholder': 'Choose publication type',

  'forms.monograph-publications.fields.publication-type.BOOK': 'Book/booklet',
  'forms.monograph-publications.fields.publication-type.DISSERTATION': 'Dissertation',
  'forms.monograph-publications.fields.publication-type.SHEET_MUSIC': 'Sheet music',
  'forms.monograph-publications.fields.publication-type.MAP': 'Map',
  'forms.monograph-publications.fields.publication-type.OTHER': 'Other',

  'forms.monograph-publications.fields.type': 'Cover format',
  'forms.monograph-publications.fields.type.placeholder': 'Choose at least one',
  'forms.monograph-publications.fields.type.PAPERBACK': 'Paperback',
  'forms.monograph-publications.fields.type.HARDBACK': 'Hardback',
  'forms.monograph-publications.fields.type.SPIRAL_BINDING': 'Spiral binding',
  'forms.monograph-publications.fields.type.OTHER_PRINT': 'Other (printed)',

  'forms.monograph-publications.fields.type-other': 'Other, which?',
  'forms.monograph-publications.fields.type-other.placeholder': 'Please input details here',

  'forms.monograph-publications.fields.fileformat': 'File format',
  'forms.monograph-publications.fields.fileformat.placeholder': 'Choose at least one',
  'forms.monograph-publications.fields.fileformat.PDF': 'PDF',
  'forms.monograph-publications.fields.fileformat.EPUB': 'EPUB',
  'forms.monograph-publications.fields.fileformat.CD_ROM': 'CD-ROM',
  'forms.monograph-publications.fields.fileformat.MP3': 'MP3',
  'forms.monograph-publications.fields.fileformat.OTHER': 'Other (electronical)',

  'forms.monograph-publications.fields.fileformat-other': 'Other, which?',
  'forms.monograph-publications.fields.fileformat-other.placeholder': 'Please input details here',

  'forms.monograph-publications.fields.title': 'Title',
  'forms.monograph-publications.fields.title.placeholder': 'e.g., Matti Meikäläisen seikkailut',

  'forms.monograph-publications.fields.subtitle': 'Subtitle',
  'forms.monograph-publications.fields.subtitle.placeholder': 'e.g., Romaani',

  'forms.monograph-publications.fields.locality': 'University location',

  'forms.monograph-publications.fields.publication-format': 'Publication format',
  'forms.monograph-publications.fields.publication-format.placeholder': 'Choose option',
  'forms.monograph-publications.fields.publication-format.PRINT': 'Printed',
  'forms.monograph-publications.fields.publication-format.ELECTRONICAL': 'Electronical',
  'forms.monograph-publications.fields.publication-format.PRINT_ELECTRONICAL': 'Both printed and electronical',

  'forms.monograph-publications.fields.printing-house': 'Manufacturer',
  'forms.monograph-publications.fields.printing-house.placeholder': 'e.g., Esimerkkipaino Oy',

  'forms.monograph-publications.fields.printing-house-city': 'Manufacturer location (city)',
  'forms.monograph-publications.fields.printing-house-city.placeholder': 'e.g., Helsinki',

  'forms.monograph-publications.fields.edition': 'Edition',
  'forms.monograph-publications.fields.edition.placeholder': 'e.g., 2',

  'forms.monograph-publications.fields.copies': 'Number of copies',
  'forms.monograph-publications.fields.copies.placeholder': 'e.g., 300',

  'forms.monograph-publications.fields.year': 'Publication year',
  'forms.monograph-publications.fields.year.placeholder': 'Select publication year',
  'forms.monograph-publications.fields.month': 'Publication month',
  'forms.monograph-publications.fields.month.placeholder': 'Select publication month',

  'forms.monograph-publications.fields.month.01': 'January',
  'forms.monograph-publications.fields.month.02': 'February',
  'forms.monograph-publications.fields.month.03': 'March',
  'forms.monograph-publications.fields.month.04': 'April',
  'forms.monograph-publications.fields.month.05': 'May',
  'forms.monograph-publications.fields.month.06': 'June',
  'forms.monograph-publications.fields.month.07': 'July',
  'forms.monograph-publications.fields.month.08': 'August',
  'forms.monograph-publications.fields.month.09': 'September',
  'forms.monograph-publications.fields.month.10': 'October',
  'forms.monograph-publications.fields.month.11': 'November',
  'forms.monograph-publications.fields.month.12': 'December',

  'forms.monograph-publications.notifications.publication-time':
    'An ISBN/ISMN cannot be requested after the book is printed, or published online.',

  'forms.monograph-publications.fields.map-scale': 'Scale',
  'forms.monograph-publications.fields.map-scale.placeholder': 'e.g., 1:20000',

  // Monograph Publication Request - Publisher / Contact information card
  'forms.monograph-publications.fields.publications-public.placeholder': 'Choose option',

  'forms.monograph-publications.fields.published-before': 'I have published previously',

  'forms.monograph-publications.fields.publisher-identifier-str': 'Publisher identifier',
  'forms.monograph-publications.fields.publisher-identifier-str.placeholder': 'e.g., 978-952-84',
  'forms.monograph-publications.fields.publisher-identifier-str.description':
    'If you do not have publisher identifier, you may leave this field empty',

  'forms.monograph-publications.fields.publishing-activity': 'My publishing activities are',
  'forms.monograph-publications.fields.publishing-activity.placeholder': 'Choose publishing activity',
  'forms.monograph-publications.fields.publishing-activity.OCCASIONAL': 'Occasional',
  'forms.monograph-publications.fields.publishing-activity.CONTINUOUS': 'Continuous',

  'forms.monograph-publications.fields.publishing-activity-amount': 'How many publications do you publish annually?',
  'forms.monograph-publications.fields.publishing-activity-amount.placeholder': 'e.g., 10',

  // Monograph Publication Request - Author card
  'forms.monograph-publications.fields.number-of-authors': 'Number of authors',
  'forms.monograph-publications.fields.number-of-authors.description':
    'You may add maximum of four authors to this form (for dissertations only one author). Other authors will be considered when the publications arrives to the National Library',
  'forms.monograph-publications.fields.number-of-authors.1': 'One',
  'forms.monograph-publications.fields.number-of-authors.2': 'Two',
  'forms.monograph-publications.fields.number-of-authors.3': 'Three',
  'forms.monograph-publications.fields.number-of-authors.4': 'Four',

  'forms.monograph-publications.fields.author.firstname': 'First name',
  'forms.monograph-publications.fields.author.firstname.placeholder': 'e.g., Matti',
  'forms.monograph-publications.fields.author.lastname': 'Last name',
  'forms.monograph-publications.fields.author.lastname.placeholder': 'e.g., Meikäläinen',
  'forms.monograph-publications.fields.author.role': 'Role',
  'forms.monograph-publications.fields.author.role.placeholder': 'Choose at least one role',

  'forms.monograph-publications.fields.author.role.AUTHOR': 'author',
  'forms.monograph-publications.fields.author.role.ILLUSTRATOR': 'illustrator',
  'forms.monograph-publications.fields.author.role.TRANSLATOR': 'translator',
  'forms.monograph-publications.fields.author.role.EDITOR': 'editor',

  // Monograph Publication Request - Additional information
  'forms.monograph-publications.fields.comments': 'Additional information',
  'forms.monograph-publications.fields.comments.placeholder': 'Please enter additional information here',

  // Forms - Serial Publication Request
  'forms.serial-publications.title': 'Apply for ISSN identifier',

  // Serial Publication Request - Headings
  'forms.serial-publications.headings.number-of-publications': 'NUMBER OF PUBLICATIONS',
  'forms.serial-publications.headings.publisher-information': 'PUBLISHER INFORMATION',
  'forms.serial-publications.headings.publication-information': 'PUBLICATION',

  // Serial Publication Request - Publisher information card
  'forms.serial-publications.fields.publisher': 'Publisher name',
  'forms.serial-publications.fields.publisher.placeholder': 'e.g., Julkaisija Oy tai Matti Meikäläinen',

  // Serial Publication Request - Publications
  'forms.serial-publications.fields.add-publication': 'Add publication',
  'forms.serial-publications.fields.add-publication-disabled': 'You may add maximum of four publications',
  'forms.serial-publications.fields.delete-publication': 'Remove publication',

  'forms.serial-publications.fields.title': 'Title',
  'forms.serial-publications.fields.title.placeholder': 'e.g., Series',

  'forms.serial-publications.fields.subtitle': 'Subtitle',
  'forms.serial-publications.fields.subtitle.placeholder': 'e.g., staff magazine',

  'forms.serial-publications.fields.place-of-publication': 'Place of publication',
  'forms.serial-publications.fields.place-of-publication.placeholder': 'e.g., Helsinki',

  'forms.serial-publications.fields.printer': 'Printing house',
  'forms.serial-publications.fields.printer.placeholder': 'e.g., Esimerkkipaino Oy',

  'forms.serial-publications.fields.issued-from-year': 'Issued under this title since year',
  'forms.serial-publications.fields.issued-from-year.placeholder': 'e.g., 2025',

  'forms.serial-publications.fields.issued-from-number': 'From number',
  'forms.serial-publications.fields.issued-from-number.placeholder': 'e.g., 1',

  'forms.serial-publications.fields.frequency': 'Publishing frequency',
  'forms.serial-publications.fields.frequency.a': 'Yearly',
  'forms.serial-publications.fields.frequency.f': 'Bi-yearly',
  'forms.serial-publications.fields.frequency.q': 'Quarterly',
  'forms.serial-publications.fields.frequency.b': 'Bi-monthly',
  'forms.serial-publications.fields.frequency.m': 'Monthly',
  'forms.serial-publications.fields.frequency.w': 'Weekly',
  'forms.serial-publications.fields.frequency.d': 'Daily',
  'forms.serial-publications.fields.frequency.k': 'Continuously',
  'forms.serial-publications.fields.frequency.#': 'Irregular',
  'forms.serial-publications.fields.frequency.z': 'Other',

  'forms.serial-publications.fields.frequency-other': 'Muu ilmestymistiheys, mikä?',
  'forms.serial-publications.fields.frequency-other.placeholder': 'e.g., kerran kahdessa vuodessa',

  'forms.serial-publications.fields.publication-type': 'Julkaisutyyppi',
  'forms.serial-publications.fields.publication-type.placeholder': 'Valitse vaihtoehto',
  'forms.serial-publications.fields.publication-type.JOURNAL': 'Journal',
  'forms.serial-publications.fields.publication-type.NEWSLETTER': 'Newsletter',
  'forms.serial-publications.fields.publication-type.STAFF_MAGAZINE': 'Staff magazine',
  'forms.serial-publications.fields.publication-type.MEMBERSHIP_BASED_MAGAZINE': 'Membership-based magazine',
  'forms.serial-publications.fields.publication-type.CARTOON': 'Cartoon',
  'forms.serial-publications.fields.publication-type.NEWSPAPER': 'Newspaper',
  'forms.serial-publications.fields.publication-type.FREE_PAPER': 'Free paper',
  'forms.serial-publications.fields.publication-type.MONOGRAPHY_SERIES': 'Monograph series',
  'forms.serial-publications.fields.publication-type.OTHER_SERIAL': 'Other (e.g., statistics, yearbook, report)',

  'forms.serial-publications.fields.publication-type-other': 'Other, which?',
  'forms.serial-publications.fields.publication-type-other.placeholder': 'e.g., report',

  'forms.serial-publications.fields.medium': 'Publication form/medium',
  'forms.serial-publications.fields.medium.placeholder': 'Choose one option',
  'forms.serial-publications.fields.medium.PRINTED': 'Printed',
  'forms.serial-publications.fields.medium.ONLINE': 'Electronical',
  'forms.serial-publications.fields.medium.CDROM': 'CD-ROM',
  'forms.serial-publications.fields.medium.OTHER': 'Other',

  'forms.serial-publications.fields.medium-other': 'Other, which?',
  'forms.serial-publications.fields.medium-other.placeholder': 'e.g., floppy disk',

  'forms.serial-publications.fields.url': 'Web-address',
  'forms.serial-publications.fields.url.placeholder': 'e.g., https://example.com',

  'forms.serial-publications.fields.has-previous': 'Publication has previous title',
  'forms.serial-publications.fields.previous.title': 'Previous title',
  'forms.serial-publications.fields.previous.title.placeholder': 'e.g., Series',
  'forms.serial-publications.fields.previous.issn': 'Previous ISSN',
  'forms.serial-publications.fields.previous.issn.placeholder': 'e.g., 1239-9132',
  'forms.serial-publications.fields.previous.last-issued': 'Last issue under this title was (issue/year)',
  'forms.serial-publications.fields.previous.last-issued.placeholder': 'e.g., 1/2025',

  'forms.serial-publications.fields.main-series.title': 'Title of the main series',
  'forms.serial-publications.fields.main-series.title.placeholder': 'e.g., Series',
  'forms.serial-publications.fields.main-series.issn': 'ISSN of the main series',
  'forms.serial-publications.fields.main-series.issn.placeholder': 'e.g., 1239-9132',

  'forms.serial-publications.fields.subseries.title': 'Title of the subseries',
  'forms.serial-publications.fields.subseries.title.placeholder': 'e.g., Series',
  'forms.serial-publications.fields.subseries.issn': 'ISSN of the subseries',
  'forms.serial-publications.fields.subseries.issn.placeholder': 'e.g., 1239-9132',

  'forms.serial-publications.fields.another-medium.title': 'Title of another medium',
  'forms.serial-publications.fields.another-medium.title.placeholder': 'e.g., Series',
  'forms.serial-publications.fields.another-medium.issn': 'ISSN of another medium',
  'forms.serial-publications.fields.another-medium.issn.placeholder': 'e.g., 1239-9132',

  'forms.serial-publications.fields.has-main-series': 'Publication is part of a main series',
  'forms.serial-publications.fields.has-subseries': 'Publication has subseries',
  'forms.serial-publications.fields.has-another-medium': 'Publication has been published in another form/medium',

  'forms.serial-publications.fields.additional-info': 'Additional information',
  'forms.serial-publications.fields.additional-info.placeholder': 'Please enter additional information here',

  // Monograph publisher classification
  'forms.monograph-publishers.fields.classification': 'Publishing subject matter',

  'forms.monograph-publishers.fields.classification.options.general': 'General',
  'forms.monograph-publishers.fields.classification.options.book-business-lib': 'Book business, Libraries',
  'forms.monograph-publishers.fields.classification.options.text-books': 'Text books',
  'forms.monograph-publishers.fields.classification.options.children-book': "Children's books", // eslint-disable-line quotes
  'forms.monograph-publishers.fields.classification.options.official-publication': 'Official publications',
  'forms.monograph-publishers.fields.classification.options.university-publication': 'University publications',
  'forms.monograph-publishers.fields.classification.options.electronic-publication': 'Electronic publications',
  'forms.monograph-publishers.fields.classification.options.audiovisual': 'Audiovisual material. Videos',
  'forms.monograph-publishers.fields.classification.options.philosophy': 'Philosophy',
  'forms.monograph-publishers.fields.classification.options.psychology': 'Psychology',
  'forms.monograph-publishers.fields.classification.options.paranormal': 'Paranormal phenomena, Occultism, Astrology',
  'forms.monograph-publishers.fields.classification.options.religion': 'Religion, Theology',
  'forms.monograph-publishers.fields.classification.options.christianity': 'Christianity',
  'forms.monograph-publishers.fields.classification.options.orthodox': 'The Ortodox Church',
  'forms.monograph-publishers.fields.classification.options.other-religions': 'Other religions',
  'forms.monograph-publishers.fields.classification.options.social-science': 'Social Science, Sociology',
  'forms.monograph-publishers.fields.classification.options.political-studies':
    'Political Studies, International Politics',
  'forms.monograph-publishers.fields.classification.options.military': 'Military Science',
  'forms.monograph-publishers.fields.classification.options.sociology': 'Sociology',
  'forms.monograph-publishers.fields.classification.options.economics': 'Economics',
  'forms.monograph-publishers.fields.classification.options.law': 'Law',
  'forms.monograph-publishers.fields.classification.options.public-administration': 'Public administration',
  'forms.monograph-publishers.fields.classification.options.education': 'Education',
  'forms.monograph-publishers.fields.classification.options.ethnography': 'Ethnography, Folklore',
  'forms.monograph-publishers.fields.classification.options.local-history': 'Local history research',
  'forms.monograph-publishers.fields.classification.options.social-politics': 'Social Politics, Welfare',
  'forms.monograph-publishers.fields.classification.options.mass-media': 'Mass Media',
  'forms.monograph-publishers.fields.classification.options.literature': 'Literature',
  'forms.monograph-publishers.fields.classification.options.fiction': 'Fiction',
  'forms.monograph-publishers.fields.classification.options.poetry': 'Poetry',
  'forms.monograph-publishers.fields.classification.options.cartoons': 'Cartoons',
  'forms.monograph-publishers.fields.classification.options.science-fiction': 'Science Fiction',
  'forms.monograph-publishers.fields.classification.options.crime-fiction': 'Crime Fiction',
  'forms.monograph-publishers.fields.classification.options.linguistic': 'Linguistic',
  'forms.monograph-publishers.fields.classification.options.sexual-minorities': 'Sexual Minorities',
  'forms.monograph-publishers.fields.classification.options.minorities': 'Minorities',
  'forms.monograph-publishers.fields.classification.options.science': 'Science',
  'forms.monograph-publishers.fields.classification.options.mathematics': 'Mathematics, Statistics',
  'forms.monograph-publishers.fields.classification.options.astronomy': 'Astronomy',
  'forms.monograph-publishers.fields.classification.options.physics': 'Physics',
  'forms.monograph-publishers.fields.classification.options.chemistry': 'Chemistry',
  'forms.monograph-publishers.fields.classification.options.geology': 'Geology',
  'forms.monograph-publishers.fields.classification.options.biology': 'Biology',
  'forms.monograph-publishers.fields.classification.options.zoology': 'Zoology',
  'forms.monograph-publishers.fields.classification.options.botany': 'Botany',
  'forms.monograph-publishers.fields.classification.options.environmental-studies':
    'Environmental Studies, Conservation',
  'forms.monograph-publishers.fields.classification.options.technology': 'Technology',
  'forms.monograph-publishers.fields.classification.options.engineering': 'Engineering Technology',
  'forms.monograph-publishers.fields.classification.options.industry': 'Industry',
  'forms.monograph-publishers.fields.classification.options.construction': 'Construction',
  'forms.monograph-publishers.fields.classification.options.transport': 'Transport, Post',
  'forms.monograph-publishers.fields.classification.options.information-tech': 'Information Technology',
  'forms.monograph-publishers.fields.classification.options.medicine': 'Medicine, Psychiatry',
  'forms.monograph-publishers.fields.classification.options.odontology': 'Odontology',
  'forms.monograph-publishers.fields.classification.options.veteriniry': 'Veterinary Medicine',
  'forms.monograph-publishers.fields.classification.options.pharmacology': 'Pharmacology, Homeopathy',
  'forms.monograph-publishers.fields.classification.options.forestry': 'Forestry',
  'forms.monograph-publishers.fields.classification.options.agriculture': 'Agriculture',
  'forms.monograph-publishers.fields.classification.options.handicraft': 'Handicraft',
  'forms.monograph-publishers.fields.classification.options.art': 'Art',
  'forms.monograph-publishers.fields.classification.options.performing-art': 'Performing Art',
  'forms.monograph-publishers.fields.classification.options.theatre': 'Theatre, Film',
  'forms.monograph-publishers.fields.classification.options.dance': 'Dance',
  'forms.monograph-publishers.fields.classification.options.visual-art': 'Visual Arts',
  'forms.monograph-publishers.fields.classification.options.art-history': 'Art History',
  'forms.monograph-publishers.fields.classification.options.architecture': 'Architecture, Industrial Art',
  'forms.monograph-publishers.fields.classification.options.fashion': 'Fashion',
  'forms.monograph-publishers.fields.classification.options.music': 'Music',
  'forms.monograph-publishers.fields.classification.options.antique': 'Antiques, Collecting',
  'forms.monograph-publishers.fields.classification.options.city-regional': 'City and Regional Planning',
  'forms.monograph-publishers.fields.classification.options.leisure-hobbies': 'Leisure and Hobbies',
  'forms.monograph-publishers.fields.classification.options.sports': 'Sports',
  'forms.monograph-publishers.fields.classification.options.games': 'Games',
  'forms.monograph-publishers.fields.classification.options.hunting-fishing': 'Hunting and Fishing',
  'forms.monograph-publishers.fields.classification.options.gardening': 'Gardening',
  'forms.monograph-publishers.fields.classification.options.home-economic': 'Home Economics',
  'forms.monograph-publishers.fields.classification.options.health-beauty': 'Health and Beauty',
  'forms.monograph-publishers.fields.classification.options.photography': 'Photography',
  'forms.monograph-publishers.fields.classification.options.tourism': 'Tourism, Travel',
  'forms.monograph-publishers.fields.classification.options.humour': 'Humour',
  'forms.monograph-publishers.fields.classification.options.history': 'History',
  'forms.monograph-publishers.fields.classification.options.geography': 'Geography',
  'forms.monograph-publishers.fields.classification.options.map-atlases': 'Maps and Atlases',
  'forms.monograph-publishers.fields.classification.options.archeology': 'Archeology',
  'forms.monograph-publishers.fields.classification.options.genealogy': 'Genealogy',
  'forms.monograph-publishers.fields.classification.options.numismatics': 'Numismatics',

  'forms.monograph-publishers.fields.classification-other': 'Other classification',
  'forms.monograph-publishers.fields.classification-other.placeholder': 'e.g., Software engineering',

  // Data tables
  'data-tables.no-results': 'No results',
  'data-tables.page': 'Page',

  // Data tables - Monograph Publisher Search Result
  'data-tables.monograph-publisher.headers.official-name': 'Name',
  'data-tables.monograph-publisher.headers.other-names': 'Other names',

  // Components

  // Header
  'components.header.title': 'Identifier Services',

  'components.header.options.languages.finnish': 'Suomeksi',
  'components.header.options.languages.swedish': 'På Svenska',
  'components.header.options.languages.english': 'In English',

  // Navbar
  'components.navbar.home': 'Homepage',
  'components.navbar.monograph-publishers': 'Publisher register',
  'components.navbar.forms': 'Forms',
  'components.navbar.other-identifiers': 'Other National Library identifiers',
  'components.navbar.forms.monograph-publishers': 'Publisher registration form',
  'components.navbar.forms.monograph-publications': 'ISBN/ISMN application for books and sheet music',
  'components.navbar.forms.serial-publications': 'ISSN application for periodicals',
  'components.navbar.forms.change-contact-details': 'Change contact information (ISBN/ISMN)',
  'components.navbar.forms.change-contact-details-mobile': 'Change contact information',
  'components.navbar.menu': 'Menu',
  'components.navbar.select-language.aria-label': 'Language',

  // Toolbar
  'components.toolbar.back-button': 'Previous page',

  // Multiselect
  'components.multiselect.clear': 'Clear',
  'components.multiselect.close': 'Close',
  'components.multiselect.help': 'You may search by writing search term and use arrow keys, enter and esc to navigate.',
  'components.multiselect.search': 'Search ...',

  // Identifier batch dialog
  'components.identifierbatches.dialog.title': 'Vahvistus / Bekräftelse / Confirmation',
  'components.identifierbatches.dialog.description-fi':
    'Vahvistan edustavani kustantajaa #PUBLISHER ja omistavani kustantajatunnuksen #PUBLISHER-IDENTIFIER',
  'components.identifierbatches.dialog.description-sv':
    'Jag bekräftar att jag representerar förlaget #PUBLISHER och äger förlagsbeteckningen #PUBLISHER-IDENTIFIER',
  'components.identifierbatches.dialog.description-en':
    'I confirm I represent #PUBLISHER (publisher ID #PUBLISHER-IDENTIFIER)',
  'components.identifierbatches.dialog.accept': 'Kyllä / Ja / Yes',
  'components.identifierbatches.dialog.decline': 'Ei / Nej / No',

  // Identifier batch card
  'components.identifierbatches.card.batch-type': 'Identifier list type',
  'components.identifierbatches.card.batch-identifiers': 'Number of identifiers',
  'components.identifierbatches.card.download': 'Download as text file',

  // Footer
  'components.footer.headings.main': 'Service information',
  'components.footer.headings.contact-information': 'Contact information',
  'components.footer.headings.service-name': 'Identifier Services',
  'components.footer.headings.links': 'Additional information',
  'components.footer.headings.social-media': 'Follow us',

  'components.footer.contact.address': 'P.O.Box 15 (Unioninkatu 36)',
  'components.footer.contact.zip': '00014 University of Helsinki',
  'components.footer.contact.email-isbn-ismn': 'isbn-keskus@helsinki.fi',
  'components.footer.contact.email-issn': 'issn-keskus@helsinki.fi',
  'components.footer.contact.phone': '+358 (0)2941 44386',

  'components.footer.service.description-1':
    "Finland's national ISBN/ISMN/ISSN Agencies are responsible for handing out ISBNs/ISMNs/ISSNs in Finland.", // eslint-disable-line
  'components.footer.service.description-2':
    'Identifiers as a part of metadata serve the publishing industry and library sector in their entirety and support identification, processing and availability of publications.',
  'components.footer.service.description-3':
    "Identifiers are used, for example, in publishing industry's ordering and distribution systems to speed up the recognition of publications as well as international and domestic joint catalogues, bibliographies, library lending systems and information retrieval.", // eslint-disable-line

  'components.footer.copyright': '© The National Library of Finland 2026',

  'components.footer.accessibility-statement': 'Accessibility statement',
  'components.footer.privacy-policy': 'Privacy policy',
  'components.footer.licenses': 'Open source licenses',
};

export default en;
