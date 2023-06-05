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

import {readEnvironmentVariable} from '@natlibfi/melinda-backend-commons';
import {parseBoolean} from './utils';

export const NODE_ENV = readEnvironmentVariable('NODE_ENV', {defaultValue: 'development'});
export const API_URL = readEnvironmentVariable('API_URL', {defaultValue: 'https://localhost:8081'});
export const MAINTENANCE_MODE = readEnvironmentVariable('MAINTENANCE_MODE', {defaultValue: false, format: v => parseBoolean(v)});
export const NOTIFICATION_BANNER = readEnvironmentVariable('NOTIFICATION_BANNER', {defaultValue: {}, format: JSON.parse});

export const CONTACT_INFORMATION_CHANGE_URL = readEnvironmentVariable('CONTACT_INFORMATION_CHANGE_URL', {defaultValue: {}, format: JSON.parse});
export const CUSTOMER_SERVICE_CONTACT = readEnvironmentVariable('CUSTOMER_SERVICE_CONTACT', {defaultValue: {phone: '', email: ''}, format: JSON.parse});

export const ALLOW_SELF_SIGNED = readEnvironmentVariable('ALLOW_SELF_SIGNED', {defaultValue: false, format: v => parseBoolean(v)});
export const HTTP_PORT = readEnvironmentVariable('HTTP_PORT', {defaultValue: 8080, format: v => Number(v)});
export const HTTPS_PORT = readEnvironmentVariable('HTTPS_PORT', {defaultValue: 8080, format: v => Number(v)});

export const TLS_KEY = readEnvironmentVariable('TLS_KEY', {defaultValue: ''});
export const TLS_CERT = readEnvironmentVariable('TLS_CERT', {defaultValue: ''});

export const DISABLE_TURNSTILE = readEnvironmentVariable('DISABLE_TURNSTILE', {defaultValue: false, format: v => parseBoolean(v)});
export const SITE_KEY = readEnvironmentVariable('SITE_KEY', {defaultValue: ''});

export const HELMET_CONFIG = readEnvironmentVariable('HELMET_CONFIG', {defaultValue: {}, format: JSON.parse});
