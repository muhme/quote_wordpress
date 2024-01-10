import { fetchQuote } from "./fetchQuote";

document.addEventListener("DOMContentLoaded", () => {
	const quoteContainers = document.querySelectorAll(".zitat-service-quote");

	quoteContainers.forEach((container) => {
		fetchQuote().then((quote) => {
			container.innerHTML = quote;
		});
	});
});
