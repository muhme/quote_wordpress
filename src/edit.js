/*
 * ********** edit.js **********
 */
import { __, getLocaleData } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";

import { useEffect, useState } from "@wordpress/element";
import { PanelBody, SelectControl } from "@wordpress/components";

// internal dependencies
import fetchQuote from "./fetchQuote";
import SelectControlUser from "./selectControlUser";
import SelectControlCategory from "./selectControlCategory";
import SelectControlAuthor from "./selectControlAuthor";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { language, userId, authorId, categoryId } = attributes;
	const [quote, setQuote] = useState("");
	const [isLoaded, setIsLoaded] = useState(false);

	const localeData = getLocaleData();
	const userLanguage = localeData[""]?.["lang"];
	console.log(`userLanguage=${userLanguage}`);

	useEffect(() => {
		fetchQuote(attributes, userLanguage).then((quote) => {
			setQuote(quote);
			setIsLoaded(true);
		});
	}, [language, userId, authorId, categoryId]);

	const handleUserChange = (selectedUserId) => {
		// convert selectedUserId to a number
		setAttributes({ userId: parseInt(selectedUserId, 10) });
	};
	const handleCategoryChange = (selectedCategoryId) => {
		// convert selectedCategoryId to a number
		setAttributes({ categoryId: parseInt(selectedCategoryId, 10) });
	};
	const handleAuthorChange = (selectedAuthorId) => {
		// convert selectedAuthorId to a number
		setAttributes({ authorId: parseInt(selectedAuthorId, 10) });
	};

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
					<SelectControlUser onChange={handleUserChange} value={userId} />
					<SelectControlCategory
						userLanguage={userLanguage}
						onChange={handleCategoryChange}
						value={categoryId}
					/>
					<SelectControlAuthor
						userLanguage={userLanguage}
						onChange={handleAuthorChange}
						value={authorId}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				{isLoaded ? (
					<div dangerouslySetInnerHTML={{ __html: quote }} />
				) : (
					<div>{__("Loading quote ...", "zitat-service")}</div>
				)}
			</div>
		</>
	);
}
