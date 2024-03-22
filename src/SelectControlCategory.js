/**
 * src/selectControlCategory.js - block editor UI SelectControl implementation for categories
 *
 * GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
 * WordPress-plugin random-quote-zitat-service, see https://github.com/muhme/quote_wordpress
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
	ZITAT_SERVICE_RANDOM_QUOTE_MAX_REQUESTED_ENTRIES,
	ZITAT_SERVICE_RANDOM_QUOTE_API_URL,
} from './common';

/* eslint-disable jsdoc/require-param, jsdoc/check-param-names -- params are not recognized correctly */
/**
 * SelectControl implementaion for selecting a category ID.
 *
 * @param {string}   userLanguage users language for category name
 * @param {Function} onChange     category change handle
 * @param {Object}   value        actual set ID value
 * @return returns category SelectControl component
 */
/* eslint-enable */
const SelectControlCategory = ( { userLanguage, onChange, value } ) => {
	const [ categories, setCategories ] = useState( [] );
	const [ isLoaded, setIsLoaded ] = useState( false );

	// e.g. https://api.zitat-service.de/v1/categories?size=10000&language=uk
	const url =
		ZITAT_SERVICE_RANDOM_QUOTE_API_URL +
		'/categories?size=' +
		ZITAT_SERVICE_RANDOM_QUOTE_MAX_REQUESTED_ENTRIES +
		'&language=' +
		validLanguage( userLanguage );

	devLog( `SelectControlCategory(${ userLanguage }) url=${ url }` );

	useEffect( () => {
		if ( ! isLoaded ) {
			fetch( url )
				.then( ( response ) => response.json() )
				.then( ( data ) => {
					setCategories( data.categories );
					setIsLoaded( true );
				} )
				.catch( ( error ) => {
					devError( 'Error fetching categories: ' + error );
				} );
		}
	}, [ isLoaded, url ] );

	const options = [
		{ label: '*', value: -1 },
		...categories.map( ( category ) => ( {
			label: category.category,
			value: category.id,
		} ) ),
	];

	return (
		<SelectControl
			label={ __( 'Category', 'random-quote-zitat-service' ) }
			value={ value }
			options={ options }
			onChange={ onChange }
		/>
	);
};
export default SelectControlCategory;
