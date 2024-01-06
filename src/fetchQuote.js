import DOMPurify from "dompurify";

const ZITAT_SERVICE_API_URL = "https://api.zitat-service.de/v1";
const ZITAT_SERVICE_VERSION = "1.3.0";
const DEFAULT_LANGUAGE = "en";

async function fetchQuote() {
	const url = `${ZITAT_SERVICE_API_URL}/quote_html?contentOnly=true&V_${ZITAT_SERVICE_VERSION}_B&language=${DEFAULT_LANGUAGE}`;
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
