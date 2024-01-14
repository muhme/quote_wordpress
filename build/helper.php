<?php

define("ZITAT_SERVICE_VERSION", "1.3.0");
// define("ZITAT_SERVICE_API_URL", "http://host.docker.internal:3000/v1");
define("ZITAT_SERVICE_API_URL", "https://api.zitat-service.de/v1");
// list of valid languages as from https://api.zitat-service.de/v1/languages
define("LANGUAGES", ["de", "es", "en", "ja", "uk"]);
// fall-back language is no language given, or the given language is not supported
define("DEFAULT_LANGUAGE", "en");

/**
 * get actual language w/o locale and fall back to "en" if not supported
 */
function getActualLanguage($language)
{
    // use WordPress" user locale if language is not set
    $language = $language ?? get_user_locale();

    // from e.g. "de-DE" extract the first two characters to get the language w/o country
    $langShort = substr($language, 0, 2);

    // extracted language is valid or default to "en"
    return in_array($langShort, LANGUAGES) ? $langShort : "en";
}

function checkLanguageForParameter($language)
{
    if ($language === "all") {
        return ""; // No language parameter
    }

    if ($language === "frontend") {
        // use WP user locale e.g. "de-DE" and extract the 1st two chars to get the language w/o country
        $language = substr(get_user_locale(), 0, 2);
    }

    // Define the default language
    $defaultLanguage = "en"; // Replace "en" with your actual default language

    // Check if the provided language is in the list of supported languages
    $l = in_array($language, LANGUAGES) ? $language : DEFAULT_LANGUAGE;

    // Return the language parameter
    return "&language=" . $l;
}

function checkIdForParameter($parameter, $attributes)
{
    // Check if either parameter or id is null or an empty string
    if ($parameter === null || $parameter === "" || $attributes === null ||
        $attributes[$parameter] === null || $attributes[$parameter] === "" || $attributes[$parameter] < 0) {
        return ""; // no parameter
    }

    return "&" . $parameter . "=" . $attributes[$parameter];
}

/**
 * retrieve quote from API in HTML style (<div> enclosed)
 */
function fetchQuote($attributes)
{
    $url = ZITAT_SERVICE_API_URL . "/quote_html?contentOnly=true&V_" . ZITAT_SERVICE_VERSION . "_B" .
    checkLanguageForParameter($attributes["language"]) .
    checkIdForParameter("userId", $attributes) .
    checkIdForParameter("authorId", $attributes) .
    checkIdForParameter("categoryId", $attributes);

    $response = wp_remote_get($url);

    if (is_wp_error($response)) {
        return __("Error fetching quote", "zitat-service");
    } else {
        return wp_remote_retrieve_body($response);
    }
}
