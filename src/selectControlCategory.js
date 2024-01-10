import { useState, useEffect } from "@wordpress/element";
import { SelectControl } from "@wordpress/components";

const LANGUAGES = ["en", "de", "es", "ja", "uk"];
const DEFAULT_LANGUAGE = "en";

function AddLanguageParameter(userLanguage) {
	return LANGUAGES.includes(userLanguage) ? userLanguage : DEFAULT_LANGUAGE;
}

const SelectControlCategory = ({ userLanguage, onChange, value }) => {
	const [categories, setCategories] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	const url =
		"https://api.zitat-service.de/v1/categories?size=2000&language=" +
		AddLanguageParameter(userLanguage);

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
					console.error("Error fetching categories:", error);
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
			label="Category"
			value={value}
			options={options}
			onChange={onChange}
		/>
	);
};

export default SelectControlCategory;
