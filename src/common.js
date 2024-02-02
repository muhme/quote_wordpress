/**
 * src/common.js - common JavaScript constants and methods
 *
 * GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
 * WordPress plugin zitat-service-random-quote, see https://github.com/muhme/quote_wordpress
 *
 */

// exported constants
const DEFAULT_LANGUAGE = 'en';
// languages that are implemented in the API , see https://api.zitat-service.de/v1/languages
const LANGUAGES = [ 'en', 'de', 'es', 'ja', 'uk' ];
const ZITAT_SERVICE_API_URL = 'https://api.zitat-service.de/v1';
const ZITAT_SERVICE_VERSION = '1.3.0';
const MAX_REQUESTED_IDS = 10000; // Januar 2024: authors, categories and users < 1.000
export {
	DEFAULT_LANGUAGE,
	LANGUAGES,
	ZITAT_SERVICE_API_URL,
	ZITAT_SERVICE_VERSION,
	MAX_REQUESTED_IDS,
};

// local constants
const VALID_LANGUAGES_VALUES = [ 'all', 'frontend', ...LANGUAGES ];
const MAX_VALID_ID = 10000; // Januar 2024: authors, categories and users < 1.000
const DEFAULT_ID = -1; // -1 is not set == all authors/categories/users

/**
 * Check if the language is supported. Returns always a supported language.
 *
 * @param {string} languageToCheck - to be checked language
 * @return {string} always return language code (e.g. 'de'), in doubt the default 'en'
 */
function validLanguage( languageToCheck ) {
	return LANGUAGES.includes( languageToCheck )
		? languageToCheck
		: DEFAULT_LANGUAGE;
}
export { validLanguage };

/**
 * Sanitize - for security reason - the given language value against the predefined list of valid language values.
 * If the language value is not in the list, it defaults to 'all'.
 *
 * @param {string} languageValue - The language code to sanitize.
 * @return {string} - The sanitized language value code, or 'all' if the input is not valid.
 */
function sanitizeLanguageValue( languageValue ) {
	if ( VALID_LANGUAGES_VALUES.includes( languageValue ) ) {
		return languageValue;
	}

	// default to 'all'
	return 'all';
}
export { sanitizeLanguageValue };

/**
 * Sanitizes - for security reason - the given ID value.
 * Valid values are from 0 to 100,000.
 * If the ID is not in the valid range, it defaults to -1.
 *
 * @param {number} id - The ID value to sanitize.
 * @return {number} - The sanitized ID value.
 */
function sanitizeIdValue( id ) {
	// check if the ID is a number and within the valid range
	if ( typeof id === 'number' && id >= DEFAULT_ID && id <= MAX_VALID_ID ) {
		return id;
	}

	// default to -1 (* == all) if the ID is not valid
	return DEFAULT_ID;
}
export { sanitizeIdValue };

/**
 * Make console.log() on development stage only.
 * @param {*} message
 */
function devLog( message ) {
	if (
		window.location.hostname === 'localhost' ||
		window.location.hostname === 'host.docker.internal'
	) {
		// as it is only on development environment
		// eslint-disable-next-line no-console
		console.log( message );
	}
}
export { devLog };

/**
 * Make console.error() on development stage only.
 * @param {*} message
 */
function devError( message ) {
	if (
		window.location.hostname === 'localhost' ||
		window.location.hostname === 'host.docker.internal'
	) {
		// as it is only on development environment
		// eslint-disable-next-line no-console
		console.error( message );
	}
}
export { devError };
