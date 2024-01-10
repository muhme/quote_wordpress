import { useState, useEffect } from "@wordpress/element";
import { SelectControl } from "@wordpress/components";

const LANGUAGES = ["en", "de", "es", "ja", "uk"];
const DEFAULT_LANGUAGE = "en";

function AddLanguageParameter(userLanguage) {
	return LANGUAGES.includes(userLanguage) ? userLanguage : DEFAULT_LANGUAGE;
}

/**
 * Returns authors name for selection list.
 * @param {*} author 
 * @returns "", "lastname", "lastname, firstname" or ", firstname"
 */
function authorName(author) {
	var authorName = "";
	if (author) {
		if (author.lastname) {
			authorName += author.lastname;
		}
		if (author.firstname) {
			authorName += ", " + author.firstname;
		}
	}
	return authorName;
}

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const SelectControlAuthor = ({ userLanguage, onChange, value }) => {
	const [authors, setAuthors] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	const url =
		"https://api.zitat-service.de/v1/authors?size=2000&language=" +
		AddLanguageParameter(userLanguage);

	console.log(`SelectControlAuthor(${userLanguage}) url=${url}`);
	useEffect(() => {
		if (!isLoaded) {
			fetch(url)
				.then((response) => response.json())
				.then((data) => {
					setAuthors(data.authors);
					setIsLoaded(true);
				})
				.catch((error) => {
					console.error("Error fetching authors:", error);
				});
		}
	}, [isLoaded]);

	const options = [
		{ label: "*", value: -1 },
		...authors.map((author) => ({
			label: authorName(author),
			value: author.authorId,
		})),
	];

	return (
		<SelectControl
			label="Author"
			value={value}
			options={options}
			onChange={onChange}
		/>
	);
};

export default SelectControlAuthor;
