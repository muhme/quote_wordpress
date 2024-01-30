/**
 * src/index.js - block.json confgured editorScript
 *
 * GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
 * WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
 */

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

// internal dependencies
import metadata from './block.json';
import Edit from './edit';

// green 'Z' as zitat-service plugin icon
const zitatServiceIcon = (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M 21.349347,0.37882874 V 3.5443873 L 9.2447721,19.700212 h 1.4269649 q 2.952335,0 4.412099,-0.541261 1.459765,-0.557664 2.689906,-1.95182 1.24654,-1.394159 1.93542,-3.427989 l 3.00154,1.016916 -3.00154,8.463357 H 2.2411804 V 20.093856 L 14.394958,3.9872358 h -1.902614 q -1.93542,0 -3.1163566,0.4592528 Q 8.1950534,4.9057398 7.3257554,5.8078431 6.456457,6.709944 4.832673,9.596669 L 1.9459475,8.3173249 5.4231393,0.37882874 Z"
			fill="#208020"
			strokeWidth=".097029"
			aria-label="Z"
		/>
	</svg>
);

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	// title and description in block.js are only placeholders, for I18N they are set here
	title: __( 'Random Quote', 'zitat-service' ),
	description: __(
		'Displays a random quote from the collection of the user community zitat-service.de.',
		'zitat-service'
	),
	// @see ./edit.js
	edit: Edit,
	icon: zitatServiceIcon,
	// quote will be fetched dynamically on the frontend, block"s save function returns markup that the frontend script can target, see frontend.js
	save: () => {
		// as we are getting 'Block validation failed' after changing locale, this is not translated
		// <div>{__("Loading quote ...", "zitat-service")}</div>
		return <div className="zitat-service-quote">...</div>;
	},
} );
