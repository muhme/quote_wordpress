import DOMPurify from "dompurify";

const ZITAT_SERVICE_API_URL = "https://api.zitat-service.de/v1";
const ZITAT_SERVICE_VERSION = "1.3.0";
const DEFAULT_LANGUAGE = "en";
// available languages from https://api.zitat-service.de/v1/languages
const LANGUAGES = {
	de: "German",
	en: "English",
	es: "Spanish",
	ja: "Japanese",
	uk: "Ukrainian",
};

/**
 * Check language parameter. Returns:
 *   - "" for "all", which means no language parameter is used
 *   - "&language=en" as default language if the requested language is no supportet
 *   - "&language=de" as sample for parameter "de"
 * @param {string} language, e.g. "uk"
 * @returns "" or e.g. "&language=uk"
 */
function checkLanguageForParameter(quoteLanguage, userLanguage) {
	var parameterLanguage;

	console.log(`checkLanguageForParameter(${quoteLanguage}, "${userLanguage})`);
	if (quoteLanguage === "all") {
		return ""; // no language parameter
	}
	if (quoteLanguage === "frontend" && userLanguage !== null) {
		quoteLanguage = userLanguage;
	}

	if (Object.keys(LANGUAGES).includes(quoteLanguage)) {
		parameterLanguage = quoteLanguage;
	} else {
		parameterLanguage = DEFAULT_LANGUAGE;
	}

	return `&language=${parameterLanguage}`;
}

function checkIdForParameter(parameter, id) {
	if (
		parameter === null ||
		parameter === "" ||
		id === null ||
		id === "" ||
		!Number.isInteger(Number(id)) ||
		Number(id) < 0
	) {
		return ""; // no parameter
	}
	return `&${parameter}=${id}`;
}

async function fetchQuote(attributes, userLanguage) {
	const { language, userId, authorId, categoryId } = attributes;
	const url =
		`${ZITAT_SERVICE_API_URL}/quote_html?contentOnly=true&V_${ZITAT_SERVICE_VERSION}_B` +
		checkLanguageForParameter(language, userLanguage) +
		checkIdForParameter("userId", userId) +
		checkIdForParameter("authorId", authorId) +
		checkIdForParameter("categoryId", categoryId);
	console.log(`fetchQuote(${url})`);
	try {
		const response = await fetch(url);
		const text = await response.text();
		return DOMPurify.sanitize(text);
	} catch (error) {
		console.error("Error fetching quote:", error);
		return "Error loading quote";
	}
}

export default fetchQuote;
