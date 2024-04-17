/**
 * src/index.js - block.json confgured editorScript
 *
 * GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
 * WordPress-plugin random-quote-zitat-service, see https://github.com/muhme/quote_wordpress
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

// green 'Zi' as random-quote-zitat-service plugin icon
// Created from 256px PNG export and get path in Inkscape, exported and manual reduced
// to prevent the problem with React's JSX doesn't support namespace tags.
const zitatServiceIcon = (
	<svg
		version="1.1"
		id="svg1"
		width="273.06668"
		height="273.06668"
		viewBox="0 0 273.06668 273.06668"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="m 188.80413,12.525098 c -14.8722,5.75363 -13.95337,34.263788 -9.09712,46.141572 3.07718,7.526416 9.9435,14.297168 18.69219,10.941569 15.53558,-5.958757 14.17641,-32.614243 9.74402,-45.074904 -2.87754,-8.089584 -9.96624,-15.6343274 -19.33909,-12.008237 m -135.470794,3.474903 -2.137447,45.866669 0.03374,16.719337 15.970371,11.013998 c 0.557438,-7.063494 0.766068,-17.941977 6.816463,-22.823048 4.179037,-3.371387 11.812078,-1.518995 16.650204,-0.948145 11.608119,1.369662 23.535799,1.517334 35.199999,2.437858 l -33.804938,94.93334 -33.395062,96 c 20.55005,-3.87184 41.23974,-7.13927 61.86667,-10.58107 6.24726,-1.04241 19.10352,-1.00957 23.93169,-5.2675 6.02889,-5.31681 7.53232,-24.38675 9.13498,-32.15143 l -14.93334,-5.33333 c -4.828,16.97392 -22.512,17.45117 -38.4,18.13333 L 173.86668,28.800002 113.06667,22.223048 53.333336,16.000001 m 129.066674,119.466669 3.2,-24.53333 c 5.3786,10.71688 3.2,24.57959 3.2,36.26667 v 57.6 c 0,9.54867 -1.47674,20.51042 0.55309,29.86667 3.20283,14.76305 21.95972,21.95464 33.22963,10.43869 7.92879,-8.10191 7.53978,-18.44587 9.95062,-28.57203 l -18.13334,-5.33333 c 0,-25.22855 1.83693,-50.47254 2.13745,-75.73334 0.11652,-9.7944 1.80537,-18.97768 0.0774,-28.8 -2.6449,-15.034162 -11.54531,-30.837499 -28.88148,-29.766259 -18.05976,1.11595 -31.57755,32.065919 -22.37119,47.675739 2.98384,5.05924 11.89338,8.48862 17.03786,10.89052 z" />
	</svg>
);

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	// title and description in block.js are only placeholders, for I18N they are set here
	title: __( 'Random Quote', 'random-quote-zitat-service' ),
	description: __(
		'Displays a random quote from the collection of the user community zitat-service.de.',
		'random-quote-zitat-service'
	),
	// @see ./edit.js
	edit: Edit,
	icon: {
		src: zitatServiceIcon,
		foreground: '#208020',
	},
	// quote will be fetched dynamically on the frontend, blocks save function returns markup that the frontend script can target, see frontend.js
	save: () => {
		// as we are getting 'Block validation failed' after changing locale, this is not translated
		// <div>{__("Loading quote ...", "zitat-service")}</div>
		return <div className="zitat-service-quote">...</div>;
	},
} );
