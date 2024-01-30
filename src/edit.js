/**
 * src/edit.js - block editor Edit implementation, used by index.js
 *
 * MIT License, Copyright (c) 2023 - 2024 Heiko Lübbe
 * WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
 *
 */
import { __, getLocaleData } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

import { useEffect, useState } from '@wordpress/element';
import { PanelBody } from '@wordpress/components';

// internal dependencies
import { devLog, sanitizeIdValue, sanitizeLanguageValue } from './common.js';
import fetchQuote from './fetchQuote';
import SelectControlLanguage from './SelectControlLanguage';
import SelectControlUser from './SelectControlUser';
import SelectControlCategory from './SelectControlCategory';
import SelectControlAuthor from './SelectControlAuthor';
import QuoteBlock from './QuoteBlock';

/* eslint-disable jsdoc/require-param, jsdoc/check-param-names -- params are not recognized correctly */
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   attributes    stored module parameter
 * @param {Function} setAttributes hook to store changed module parameter
 * @return {Element} Element to render.
 *
 *  @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 */
/* eslint-enable */
export default function Edit( { attributes, setAttributes } ) {
	const { language, userId, authorId, categoryId } = attributes;
	const [ quoteData, setQuote ] = useState( {} );
	const [ isLoaded, setIsLoaded ] = useState( false );

	const localeData = getLocaleData();
	const userLanguage = localeData[ '' ]?.lang;

	devLog( `Edit() userLanguage=${ userLanguage }` );

	useEffect( () => {
		fetchQuote( attributes, userLanguage ).then( ( thisQuoteData ) => {
			setQuote( thisQuoteData );
			setIsLoaded( true );
			devLog( 'Edit() ' + JSON.stringify( thisQuoteData ) );
		} );
	}, [ attributes, userLanguage, language, userId, authorId, categoryId ] );

	const handleLanguageChange = ( selectedLanguage ) => {
		// sanitize and store
		setAttributes( {
			language: sanitizeLanguageValue( selectedLanguage ),
		} );
	};
	const handleUserChange = ( selectedUserId ) => {
		// convert selectedUserId to a number and sanitize
		setAttributes( {
			userId: sanitizeIdValue( parseInt( selectedUserId, 10 ) ),
		} );
	};
	const handleCategoryChange = ( selectedCategoryId ) => {
		// convert selectedCategoryId to a number and sanitize
		setAttributes( {
			categoryId: sanitizeIdValue( parseInt( selectedCategoryId, 10 ) ),
		} );
	};
	const handleAuthorChange = ( selectedAuthorId ) => {
		// convert selectedAuthorId to a number and sanitize
		setAttributes( {
			authorId: sanitizeIdValue( parseInt( selectedAuthorId, 10 ) ),
		} );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'zitat-service' ) }>
					<SelectControlLanguage
						onChange={ handleLanguageChange }
						value={ sanitizeLanguageValue( language ) }
					/>
					<SelectControlUser
						onChange={ handleUserChange }
						value={ sanitizeIdValue( userId ) }
					/>
					<SelectControlCategory
						userLanguage={ userLanguage }
						onChange={ handleCategoryChange }
						value={ sanitizeIdValue( categoryId ) }
					/>
					<SelectControlAuthor
						userLanguage={ userLanguage }
						onChange={ handleAuthorChange }
						value={ sanitizeIdValue( authorId ) }
					/>
				</PanelBody>
			</InspectorControls>
			<QuoteBlock
				isLoaded={ isLoaded }
				quoteData={ quoteData }
				useBlockProps={ useBlockProps }
			/>
		</>
	);
}
