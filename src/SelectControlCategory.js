/**
 * src/selectControlCategory.js - block editor UI SelectControl implementation for categories
 *
 * MIT License, Copyright (c) 2023 - 2024 Heiko Lübbe
 * WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
 *
 */
import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { SelectControl } from "@wordpress/components";

// internal dependencies
import { devLog, validLanguage, MAX_REQUESTED_IDS, ZITAT_SERVICE_API_URL } from "./common";

/**
 * SelectControl implementaion for selecting a category ID.
 * 
 * @param {string} userLanguage users language for category name
 * @param {} onChange category change handle
 * @param {} value actual set ID value
 * @returns SelectControl
 */
const SelectControlCategory = ({ userLanguage, onChange, value }) => {
	const [categories, setCategories] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	// e.g. https://api.zitat-service.de/v1/categories?size=10000&language=uk
	const url =
		ZITAT_SERVICE_API_URL +
		"/categories?size=" +
		MAX_REQUESTED_IDS +
		"&language=" +
		validLanguage(userLanguage);

	devLog(`SelectControlCategory(${userLanguage}) url=${url}`);
	
	useEffect(() => {
		if (!isLoaded) {
			fetch(url)
				.then((response) => response.json())
				.then((data) => {
					setCategories(data.categories);
					setIsLoaded(true);
				})
				.catch((error) => {
					console.error("Error fetching categories: ", error);
				});
		}
	}, [isLoaded]);

	const options = [
		{ label: "*", value: -1 },
		...categories.map((category) => ({
			label: category.category,
			value: category.id,
		})),
	];

	return (
		<SelectControl
			label={__("Category", "zitat-service")}
			value={value}
			options={options}
			onChange={onChange}
		/>
	);
};
export default SelectControlCategory;
