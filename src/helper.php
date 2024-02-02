<?php
/**
 * src/helper.php - PHP constants and common used methods
 *
 * GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
 * WordPress plugin zitat-service-random-quote, see https://github.com/muhme/quote_wordpress
 *
 */

// plugin version as in src/block.json and src/common.js
define("ZITAT_SERVICE_VERSION", "1.3.0");

// define("ZITAT_SERVICE_API_URL", "http://host.docker.internal:3000/v1");
define("ZITAT_SERVICE_API_URL", "https://api.zitat-service.de/v1");

// list of valid languages as from https://api.zitat-service.de/v1/languages
define("LANGUAGES", ["de", "es", "en", "ja", "uk"]);

// fall-back language English if the given language is not supported
define("DEFAULT_LANGUAGE", "en");

/**
 * Create appropriate language parameter part of URL.
 *
 * Check for language parameter 'all' or language is not set and
 * return empty string '' (to fetch quotes from all languages) in these cases.
 * Check for language parameter 'frontend' and use the language from users locale in this case.
 * Finally check if the language is one of the five supported languages, else fallback to English.
 *
 * @param string $language Two letter language code, e.g. 'uk'
 *
 * @return string Empty string '' or URL parameter string part, e.g. '&language=uk'.
 */
function createLanguageParameter($language)
{
    if ($language === null || $language === "all") {
        return ""; // no language parameter, use all languages
    }

    if ($language === "frontend") {
        // use WP user locale e.g. "de-DE" and extract the 1st two chars to get the language w/o country
        $language = substr(get_user_locale(), 0, 2);
    }

    // check if the provided language is in the list of supported languages, else fallback and return English
    return "&language=" . (in_array($language, LANGUAGES) ? $language : DEFAULT_LANGUAGE);
}

/**
 * Create appropriate parameter with ID value.
 *
 * Returns URL parameter string part in the format '&parameter=value' if the
 * provided parameter and the corresponding value is existing and value is positive.
 * Otherwise, an empty string '' is returned.
 *
 * @param string $parameter The name of the parameter to be checked and to be included in the URL string.
 * @param array $attributes An associative array containing this parameter and ID value.
 *
 * @return string Empty string '' or URL parameter string part, e.g. "&categoryId=42".
 */
function createdIdParameter($parameter, $attributes)
{
    // check if either parameter or id is null or an empty string
    if (empty($parameter) || empty($attributes) || empty($attributes[$parameter]) || $attributes[$parameter] < 0) {
        return ""; // no parameter
    }

    // return the parameter part with the ID
    return "&" . $parameter . "=" . $attributes[$parameter];
}

/**
 * Fetches a quote from API and returns it in HTML format (<div> enclosed).
 *
 * @param array $attributes An associative array containing potential parameters and their values.
 *
 * @return string quote HTML formatted quote or error message.
 */
function retrieveQuote($attributes)
{
    // creating URL to fetch quote (V - version, B - block editor)
    $url = ZITAT_SERVICE_API_URL . "/quote_html?contentOnly=true&V_" . ZITAT_SERVICE_VERSION . "_B" .
    // add language attribute, if existing
    createLanguageParameter($attributes["language"]) .
    // add the three numerical ID attributes, if existing
    createdIdParameter("userId", $attributes) .
    createdIdParameter("authorId", $attributes) .
    createdIdParameter("categoryId", $attributes);

    $response = wp_remote_get($url);

    if (is_wp_error($response)) {
        return __("Error fetching quote", "zitat-service-random-quote");
    }

    // extract the response code
    $response_code = wp_remote_retrieve_response_code($response);
    $response_body = wp_remote_retrieve_body($response);

    // check for 200 OK
    if ($response_code == 200) {
        // return HTML formatted quote
        return $response_body;
    }

    // try to decode JSON e.g. from
    // {“error”:{“statusCode”:404,”name”:”NotFoundError”,”message”:”No quote found for given parameters: language=ja (Japanese), userId=85 (charly).”}}
    $jsonData = json_decode($response_body, true);
    // check 'error' key exists and if the status code is 404
    if (isset($jsonData['error']) && isset($jsonData['error']['statusCode']) && isset($jsonData['error']['message'])) {
        // construct nicer error message
        // e.g. "Error 404 – No quote found for given parameters: language=ja (Japanese), userId=85 (charly)."
        // not translated as the error message itself is always English
        return "Error " . $jsonData['error']['statusCode'] . " – " . $jsonData['error']['message'];
    }

    // if not error JSON return the raw message
    // e.g. Error Service Unavailable
    // not translated as the error message itself is always English
    return "Error " . $response_body;
}
