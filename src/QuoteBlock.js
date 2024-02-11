/**
 * src/quoteBlock.js - React quote return block, used by edit.js
 *
 * GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
 * WordPress-plugin Zitat-Service Random Quote, see https://github.com/muhme/quote_wordpress
 *
 */
import React from 'react';

/* eslint-disable jsdoc/require-param, jsdoc/check-param-names -- params are not recognized correctly */
/**
 * Renders a block component for displaying a quotation.
 *
 * Dynamically renders a quotation if it is already `isloaded` and there are no errors.
 * Before `isLoaded` it displays locale independent placeholder `...`.
 * If `errorMessage` exists in `quoteData`, an error message is rendered.
 *
 * @param {boolean}  isLoaded      Indicates if the `quoteData` is loaded or not.
 * @param {Object}   quoteData     An object containing the quotation data or the error.
 *                                 Valid `quoteData` contains always `quote`, `link` and `authorId`.
 *                                 `authorId` 0 stands for unknown is selectable and 'unknown' is not displayed.
 *                                 Optional are `authorName`, `authorLink`, `source` and `sourceLink`.
 * @param {Function} useBlockProps React hook, with the block properties.
 * @return {JSX.Element}           A JSX element representing the rendered block. This could be the
 *                                 quotation content, an error message, or a loading placeholder `...`.
 *
 * JSX.Element with error by sample:
 *    <div class="zitat-service-quote">
 *      <div class="quote">
 *        <div class="error">
 *          <span>Error: 404 – No quote found for given parameters: language=ja (Japanese), userId=97 (Ballonie).</span>
 *       </div>
 *     </div>
 *   </div>
 *
 * JSX.Element with quotation by sample:
 *   <div class="zitat-service-quote">
 *     <div class="quote">
 *       <div class="quotation">
 *         <a href="https://www.zitat-service.de/uk/quotations/1899">Слава Україні!</a>
 *       </div>
 *       <div class="source">
 *         <a href="https://uk.wikipedia.org/wiki/Шевченко_Тарас_Григорович">Тарас Григорович Шевченко</a>
 *         <span><a href="https://de.wikipedia.org/wiki/Ruhm_der_Ukraine">Slawa Ukrajini! ("Ruhm der Ukraine!"), ukrainischer Wahlspruch und Gruß, Gedicht "Für Osnowjanenko" ("До Основ'яненка"), 1840</a></span>
 *       </div>
 *     </div>
 *   </div>
 *
 * If the author's name and the source of the quotation are given, they are separated by a comma and a space ', '.
 *
 * In React, strings rendered inside JSX are automatically escaped. Strings inside {} in JSX,
 * React escapes any HTML tags or entities in that string, preventing XSS attacks.
 * Therefore, the JSON output from API is not specially HTML escaped.
 */
/* eslint-enable */
const QuoteBlock = ( { isLoaded, quoteData, useBlockProps } ) => {
	return (
		<div { ...useBlockProps() }>
			{ isLoaded ? (
				<div className="zitat-service-quote">
					<div className="quote">
						{ quoteData.errorMessage ? (
							<div className="error">
								<span>Error: { quoteData.errorMessage }</span>
							</div>
						) : (
							<>
								<div className="quotation">
									{ /* Because zitat-service.de has x-frame-options: SAMEORIGIN we need a new tab/window
									 * with target. For security reasons rel="noopener noreferrer" is set to prevent the
									 * new page from being able to access the window.opener property and ensures that no
									 *	referrer information is passed to the new page.
									 */ }
									<a
										href={ quoteData.link }
										target="_blank"
										rel="noopener noreferrer"
									>
										{ quoteData.quote }
									</a>
								</div>
								{ ( quoteData.source ||
									quoteData.authorId !== 0 ) && (
									<div className="source">
										{ quoteData.authorId !== 0 &&
											( quoteData.authorLink ? (
												<a
													href={
														quoteData.authorLink
													}
												>
													{ quoteData.authorName }
												</a>
											) : (
												<span>
													{ quoteData.authorName }
												</span>
											) ) }
										{ quoteData.source &&
											( quoteData.sourceLink ? (
												<span>
													<a
														href={
															quoteData.sourceLink
														}
													>
														{ ( quoteData.authorId !==
														0
															? ', '
															: '' ) +
															quoteData.source }
													</a>
												</span>
											) : (
												<span>
													{ ( quoteData.authorId !== 0
														? ', '
														: '' ) +
														quoteData.source }
												</span>
											) ) }
									</div>
								) }
							</>
						) }
					</div>
				</div>
			) : (
				<div className="zitat-service-quote">...</div>
			) }
		</div>
	);
};
export default QuoteBlock;
