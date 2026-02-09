# Identifier Services Public UI

## Introduction

Identifier Services system is a custom built system for ISBN, ISMN and ISSN services provided by National Library of Finland. Identifier Services Public UI is the component of the system that provides web-based user-interface that interacts with Identifier Services API and allows customers to send different types of registration and application forms.

Identifier Services Public UI is currently written in TypeScript using React 19 framework that is bundled to JS using Vite. Server that serves bundled JS code together with assets in staging and production modes is written in NodeJS (version >= 22) and uses Express. Express server uses MJS so it can be run directly without the build phase.

Identifier Services Public UI forms are based on the original [Identifier Registry](https://github.com/petkivim/id-registry) by [Petteri Kivimäki](https://github.com/petkivim/).

## Technical guide

### Installation (development)

Clone the repo, install npm packages using `npm i`. Then setup your development env file by renaming `example.env` to `.env.dev`. If you want to adjust the settings, see the environment guide below. Start UI in development mode with `npm run dev` which will start Vite development server in port 5173. Note you will need to add `.env.staging` with appropriate content if you wish to run application in staging mode locally.

Note that when in development mode, the application logic may differ from staging/production mode in ways that allows faster iteration, such as skipping form terms and conditions page.

### Installation (production)

For production use it is proposed to use provided Dockerfile for building a image that should be run in safe container environments. Read guide on environmental variables very carefully so that you provide correct setup for the application.

### Configuring runtime environment

Following environmental variables may be configured for UI to use during **runtime**. Some of the variables are mandatory.

#### Process environment

| Name             | Mandatory | Default     | Description                                                                                                                          |
| ---------------- | --------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| NODE_ENV         | Yes       | development | Runtime environment: production, staging or development                                                                              |
| HTTP_PORT        | Yes       | 8080        | Port number to run HTTP-server on (note: on npm run dev Vite is used and will serve content on port 5173 regardless of this setting) |
| LOG_LEVEL        | Yes       | info        | Level of logging for Express server                                                                                                  |
| MAINTENANCE_MODE | No        | false       | Whether to not proxy API calls and display maintenance page                                                                          |

#### API connection

| Name                        | Mandatory | Default                | Description                                                  |
| --------------------------- | --------- | ---------------------- | ------------------------------------------------------------ |
| API_HOST                    | Yes       | https://localhost:8081 | API URL to which /api requests are proxied to                |
| API_KEY                     | No        | empty string           | API key to include to X-Api-Key header for proxied API calls |
| API_PATH_PREFIX             | No        | empty string           | Prefix to include to URL for all proxied API calls           |
| API_CLIENT_CERTIFICATE_KEY  | No        | empty string           | Filepath to read mounted API client certificate key          |
| API_CLIENT_CERTIFICATE_CERT | No        | empty string           | Filepath to read mounted API client certificate cert         |

#### Turnstile

| Name              | Mandatory | Default      | Description                                                    |
| ----------------- | --------- | ------------ | -------------------------------------------------------------- |
| TURNSTILE_SITEKEY | Yes       | empty string | Cloudflare Turnstile site key to use for identifying bot users |

#### Other configuration

| Name                | Mandatory | Default | Description                                                                          |
| ------------------- | --------- | ------- | ------------------------------------------------------------------------------------ |
| NOTIFICATION_BANNER | No        | {}      | Defines notification to display on top of the page. See example.env regarding format |
| HELMET_CONFIG       | No        | {}      | [Helmet](https://helmetjs.github.io/) configuration                                  |
| PROXY_CUSTOM_HEADER | No        | 8080    | HTTP header to provide origin IP for proxied API calls                               |
| PROXY_IP_SRC_HEADER | No        | 8080    | HTTP header to read origin IP from when proxying API calls                           |

## Use of AI disclosure

During the initial stages of development eventually leading to Identifier Services Public UI v2, the author used GitHub Copilot (Business) as tool to help in application development.

## License and copyright

Copyright (c) of Identifier Registry 2016 University Of Helsinki (The National Library Of Finland), Petteri Kivimäki

Copyright (c) of Identifier Services UI 2023-2026 **University Of Helsinki (The National Library Of Finland)**

This project's source code located in this repository is licensed under the terms of **MIT**. Note that icons and fonts provided by project dependencies use separate licenses. For further information see [LICENSE-file](https://github.com/NatLibFi/identifier-services-ui-public/blob/main/LICENSE).
