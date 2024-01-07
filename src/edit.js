/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";

import { useEffect, useState } from "@wordpress/element";
import fetchQuote from "./fetchQuote";
import { PanelBody, SelectControl } from "@wordpress/components";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { language } = attributes;
	const [quote, setQuote] = useState("");
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		fetchQuote(language).then((quote) => {
			setQuote(quote);
			setIsLoaded(true);
		});
	}, [language]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Settings", "zitat-service")}>
					<SelectControl
						label={__("Language", "zitat-service")}
						value={language || "all"}
						options={[
                            { label: "🌍 all", value: "all" },
							{ label: "Frontend", value: "frontend" },
							{ label: "🇩🇪 de", value: "de" },
							{ label: "🇬🇧 en", value: "en" },
							{ label: "🇪🇸 es", value: "es" },
							{ label: "🇯🇵 ja", value: "ja" },
							{ label: "🇺🇦 uk", value: "uk" },
						]}
						onChange={(value) => setAttributes({ language: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				{isLoaded ? (
					<div dangerouslySetInnerHTML={{ __html: quote }} />
				) : (
					<p>Loading quote...</p>
				)}
			</div>
		</>
	);
}
