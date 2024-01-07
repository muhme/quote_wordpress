import { useState, useEffect } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';

const SelectControlUser = ({ onChange, value }) => {
    const [users, setUsers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!isLoaded) {
            fetch('https://api.zitat-service.de/v1/users?size=2000')
                .then((response) => response.json())
                .then((data) => {
                    setUsers(data.users);
                    setIsLoaded(true);
                })
                .catch((error) => {
                    console.error('Error fetching users:', error);
                });
        }
    }, [isLoaded]);

    const options = [
        { label: "*", value: -1 },
        ...users.map(user => ({
            label: user.login,
            value: user.id
        }))
    ];

    return (
        <SelectControl
            label="Select a user"
            value={value}
            options={options}
            onChange={onChange}
        />
    );
};

export default SelectControlUser;
