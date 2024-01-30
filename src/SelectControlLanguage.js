/**
 * src/selectControlUser.js - block editor UI SelectControl implementation for zitat-service users
 *
 * GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
 * WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
 *
 */
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

// internal dependencies
import { devLog } from './common';

/* eslint-disable jsdoc/require-param, jsdoc/check-param-names -- params are not recognized correctly */
/**
 * SelectControl implementaion for selecting the quotations language.
 *
 * @param {Function} onChange user change handle
 * @param {Object}   value    actual set ID value
 * @return {Object} returns language SelectControl component
 */
/* eslint-enable */
const SelectControlLanguage = ( { onChange, value } ) => {
	devLog( `SelectControlLanguage()` );

	const options = [
		{ label: '*', value: 'all' },
		{ label: 'Frontend', value: 'frontend' },
		{ label: '🇩🇪 de', value: 'de' },
		{ label: '🇬🇧 en', value: 'en' },
		{ label: '🇪🇸 es', value: 'es' },
		{ label: '🇯🇵 ja', value: 'ja' },
		{ label: '🇺🇦 uk', value: 'uk' },
	];

	return (
		<SelectControl
			label={ __( 'Language', 'zitat-service' ) }
			value={ value }
			options={ options }
			onChange={ onChange }
		/>
	);
};
export default SelectControlLanguage;
