/**
 * src/selectControlAuthor.js - block editor UI SelectControl implementation for authors
 *
 * GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
 * WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
 *
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';

// internal dependencies
import {
	devLog,
	devError,
	validLanguage,
	MAX_REQUESTED_IDS,
	ZITAT_SERVICE_API_URL,
} from './common';

/**
 * Returns authors name for selection list.
 * @param {Object} author
 * @return {string} "", "lastname", "lastname, firstname" or ", firstname"
 */
function authorName( author ) {
	let lastFirstName = '';
	if ( author ) {
		if ( author.lastname ) {
			lastFirstName += author.lastname;
		}
		if ( author.firstname ) {
			lastFirstName += ', ' + author.firstname;
		}
	}
	return lastFirstName;
}

/* eslint-disable jsdoc/require-param, jsdoc/check-param-names -- params are not recognized correctly */
/**
 * SelectControl implementaion for selecting an authors ID.
 *
 * @param {string}   userLanguage users language for author names
 * @param {Function} onChange     author change handle
 * @param {Object}   value        actual set ID value
 * @return {SelectControl} SelectControl component for selecting authors
 *                         by 'lastname, firstname' plus '*' for all authors
 */
/* eslint-enable */
const SelectControlAuthor = ( { userLanguage, onChange, value } ) => {
	const [ authors, setAuthors ] = useState( [] );
	const [ isLoaded, setIsLoaded ] = useState( false );

	// e.g. https://api.zitat-service.de/v1/authors?size=10000&language=ja
	const url =
		ZITAT_SERVICE_API_URL +
		'/authors?size=' +
		MAX_REQUESTED_IDS +
		'&language=' +
		validLanguage( userLanguage );

	devLog( `SelectControlAuthor(${ userLanguage }) url=${ url }` );

	useEffect( () => {
		if ( ! isLoaded ) {
			fetch( url )
				.then( ( response ) => response.json() )
				.then( ( data ) => {
					setAuthors( data.authors );
					setIsLoaded( true );
				} )
				.catch( ( error ) => {
					devError( 'Error fetching authors: ', error );
				} );
		}
	}, [ isLoaded, url ] );

	const options = [
		{ label: '*', value: -1 },
		...authors.map( ( author ) => ( {
			label: authorName( author ),
			value: author.authorId,
		} ) ),
	];

	return (
		<SelectControl
			label={ __( 'Author', 'zitat-service' ) }
			value={ value }
			options={ options }
			onChange={ onChange }
		/>
	);
};
export default SelectControlAuthor;
