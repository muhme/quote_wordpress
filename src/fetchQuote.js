/*
 * ********** fetchQuote.js **********
 */
import { __ } from "@wordpress/i18n";
import DOMPurify from "dompurify";

// internal dependencies
import {
	ValidLanguage,
	ZITAT_SERVICE_API_URL,
	ZITAT_SERVICE_VERSION,
} from "./common";

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

	console.log(`checkLanguageForParameter(${quoteLanguage}, ${userLanguage})`);
	if (quoteLanguage === "all") {
		return ""; // no language parameter
	}
	if (quoteLanguage === "frontend" && userLanguage !== null) {
		quoteLanguage = userLanguage;
	}

	parameterLanguage = ValidLanguage(quoteLanguage);

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
		return __("Error fetching quote", "zitat-service");
	}
}

export default fetchQuote;
