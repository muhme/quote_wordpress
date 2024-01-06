/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./style.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import metadata from "./block.json";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	icon: () => (
		<svg
			width="24"
			height="24"
			version="1.1"
			viewBox="0 0 6.35 6.35"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="m5.3961 0.37883v0.78028l-2.9837 3.9823h0.35173q0.72772 0 1.0875-0.13342 0.35982-0.13746 0.66304-0.48111 0.30726-0.34365 0.47706-0.84497l0.73985 0.25066-0.73985 2.0861h-4.3057v-0.78028l2.9958-3.9701h-0.46898q-0.47706 0-0.76815 0.1132-0.29109 0.1132-0.50536 0.33556-0.21427 0.22236-0.61452 0.93391l-0.71155-0.31535 0.8571-1.9568z"
				fill="#208020"
				stroke-width=".097029"
				aria-label="Z"
			/>
		</svg>
	),
	// quote will be fetched dynamically on the frontend, block's save function returns markup that the frontend script can target, see frontend.js
	save: () => {
        return <div className="zitat-service-quote">Loading quote...</div>;
    },
});
