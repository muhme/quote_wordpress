/*
 * ********** selectControlCategory.js **********
 */
import { __, getLocaleData } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { SelectControl } from "@wordpress/components";

// internal dependencies
import { ValidLanguage, ZITAT_SERVICE_API_URL } from "./common";

const SelectControlCategory = ({ userLanguage, onChange, value }) => {
	const [categories, setCategories] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	const url =
		ZITAT_SERVICE_API_URL +
		"/categories?size=2000&language=" +
		ValidLanguage(userLanguage);

	console.log(`SelectControlCategory(${userLanguage}) url=${url}`);
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
