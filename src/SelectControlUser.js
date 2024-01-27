/**
 * src/selectControlUser.js - block editor UI SelectControl implementation for zitat-service users
 *
 * MIT License, Copyright (c) 2023 - 2024 Heiko Lübbe
 * WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
 *
 */
import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { SelectControl } from "@wordpress/components";

// internal dependencies
import { devLog, MAX_REQUESTED_IDS, ZITAT_SERVICE_API_URL } from "./common";

/**
 * SelectControl implementaion for selecting a zitat-service user ID.
 *
 * @param {} onChange user change handle
 * @param {} value actual set ID value
 * @returns SelectControl
 */
const SelectControlUser = ({ onChange, value }) => {
	const [users, setUsers] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	// e.g. https://api.zitat-service.de/v1/users?size=10000
	const url = ZITAT_SERVICE_API_URL + "/users?size=" + MAX_REQUESTED_IDS;

	devLog(`SelectControlUser() url=${url}`);

	useEffect(() => {
		if (!isLoaded) {
			fetch(url)
				.then((response) => response.json())
				.then((data) => {
					setUsers(data.users);
					setIsLoaded(true);
				})
				.catch((error) => {
					console.error("Error fetching users: ", error);
				});
		}
	}, [isLoaded]);

	const options = [
		{ label: "*", value: -1 },
		...users.map((user) => ({
			label: user.login,
			value: user.id,
		})),
	];

	return (
		<SelectControl
			label={__("User", "zitat-service")}
			value={value}
			options={options}
			onChange={onChange}
		/>
	);
};
export default SelectControlUser;
