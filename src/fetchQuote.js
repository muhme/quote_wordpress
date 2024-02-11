/**
 * src/fetchQuote.js - fetching a random quote, used by index.js
 *
 * GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
 * WordPress-plugin Zitat-Service Random Quote, see https://github.com/muhme/quote_wordpress
 *
 */

// internal dependencies
import {
	devLog,
	devError,
	validLanguage,
	ZITAT_SERVICE_RANDOM_QUOTE_API_URL,
	ZITAT_SERVICE_RANDOM_QUOTE_VERSION,
} from './common';

/**
 * Check language parameter. Returns:
 *   - "" for "all", which means no language parameter is used
 *   - "&language=en" as default language if the requested language is no supportet
 *   - "&language=de" as sample for parameter "de"
 * @param {string} quoteLanguage from module attribute, e.g. "frontend"
 * @param {string} userLanguage  e.g. "uk"
 * @return {string} "" or e.g. "&language=uk"
 */
function checkLanguageForParameter( quoteLanguage, userLanguage ) {
	devLog(
		`checkLanguageForParameter(${ quoteLanguage }, ${ userLanguage })`
	);

	if ( quoteLanguage === 'all' ) {
		return ''; // no language parameter
	}
	if ( quoteLanguage === 'frontend' && userLanguage !== null ) {
		quoteLanguage = userLanguage;
	}

	const parameterLanguage = validLanguage( quoteLanguage );

	return `&language=${ parameterLanguage }`;
}

/**
 * Check parameter with ID and return string with URL part.
 *
 * @param {string} parameter parameter name, e.g. 'categoryId'
 * @param {number} id        parameter value, e.g. 42
 * @return {string} with URL part e.g. '&categoryId=42' or empty string ''
 */
function checkIdForParameter( parameter, id ) {
	if (
		parameter === null ||
		parameter === '' ||
		id === null ||
		id === '' ||
		! Number.isInteger( Number( id ) ) ||
		Number( id ) < 0
	) {
		return ''; // no parameter
	}
	return `&${ parameter }=${ id }`;
}

/**
 * Return random quote for given parameters from API in HTML format.
 *
 * errors are protocolled in paralell on console.error() in dev env
 *
 * @param {*}      attributes   ID parameters
 * @param {string} userLanguage language code from users locale data, e.g. 'de'
 * @return {Object} JSON object with quote attributes or errorMessage
 */
async function fetchQuote( attributes, userLanguage ) {
	const { language, userId, authorId, categoryId } = attributes;
	let url = '';

	try {
		// compose URL with parameters, plugin version 'V' and blocke editor marker 'B'
		url =
			`${ ZITAT_SERVICE_RANDOM_QUOTE_API_URL }/quote?V_${ ZITAT_SERVICE_RANDOM_QUOTE_VERSION }_B` +
			checkLanguageForParameter( language, userLanguage ) +
			checkIdForParameter( 'userId', userId ) +
			checkIdForParameter( 'authorId', authorId ) +
			checkIdForParameter( 'categoryId', categoryId );

		// do the request
		const response = await fetch( url );

		// check and proceed the response
		if ( ! response.ok ) {
			const err = 'response is not JSON parsable';
			let jsonResponse;
			try {
				jsonResponse = await response.json();
			} catch ( e ) {
				devError( err + ' 1: ' + JSON.stringify( jsonResponse ) );
				throw new Error( err );
			}
			if (
				jsonResponse &&
				jsonResponse.error &&
				jsonResponse.error.statusCode &&
				jsonResponse.error.message
			) {
				// JSON packed error from API found
				// e.g. "Error 404 – No quote found for given parameters: language=ja (Japanese), userId=85 (charly)."
				throw new Error(
					jsonResponse.error.statusCode +
						' – ' +
						jsonResponse.error.message
				);
			}
			// response is not parsable, simple return the stuff
			devError( err + ' 2: ' + JSON.stringify( jsonResponse ) );
			throw new Error( err );
		}
		const json = await response.json();
		devLog( 'fetchQuote() returns ' + JSON.stringify( json ) );
		return json;
	} catch ( error ) {
		// 1st protocol to console in dev env
		devError(
			"Error fetching the data from url '" + url + "': " + error.message
		);
		// 2nd return the error
		// not translated as the error message from API is always English
		return { errorMessage: error.message };
	}
}
export default fetchQuote;
