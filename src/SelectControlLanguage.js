/**
 * src/selectControlUser.js - block editor UI SelectControl implementation for zitat-service users
 *
 * MIT License, Copyright (c) 2023 - 2024 Heiko Lübbe
 * WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
 *
 */
import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { SelectControl } from "@wordpress/components";

// internal dependencies
import { devLog } from "./common";

/**
 * SelectControl implementaion for selecting the quotations language.
 *
 * @param {} onChange user change handle
 * @param {} value actual set ID value
 * @returns SelectControl
 */
const SelectControlLanguage = ({ onChange, value }) => {

	devLog(`SelectControlLanguage()`);

	const options = [
		{ label: "*", value: "all" },
		{ label: "Frontend", value: "frontend" },
		{ label: "🇩🇪 de", value: "de" },
		{ label: "🇬🇧 en", value: "en" },
		{ label: "🇪🇸 es", value: "es" },
		{ label: "🇯🇵 ja", value: "ja" },
		{ label: "🇺🇦 uk", value: "uk" },
	];

	return (
		<SelectControl
			label={__("Language", "zitat-service")}
			value={value}
			options={options}
			onChange={onChange}
		/>
	);
};
export default SelectControlLanguage;
