/*
 * ********** common.js **********
 */
const LANGUAGES = ["en", "de", "es", "ja", "uk"];
const DEFAULT_LANGUAGE = "en";
const ZITAT_SERVICE_API_URL = "https://api.zitat-service.de/v1";
const ZITAT_SERVICE_VERSION = "1.3.0";

/**
 * Check if the language is supported. Returns always a supported language.
 * 
 * @param {*} userLanguage - to be checked language
 * @returns always return language code (e.g. 'de'), in doubt the default 'en'
 */
function ValidLanguage(language_to_check) {
	return LANGUAGES.includes(language_to_check) ? language_to_check : DEFAULT_LANGUAGE;
}
export {ValidLanguage, ZITAT_SERVICE_API_URL, ZITAT_SERVICE_VERSION};
