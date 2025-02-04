import {useEffect, useState} from "react";

const useLocateAdmin = () => {
    const [userData, setUserData] = useState<any>(null);
    const [, setErrorMessage] = useState<string | null>(null);
    const [, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setErrorMessage(null);

            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    setErrorMessage('No token found, please login.');
                    setLoading(false);
                    return;
                }

                const response = await fetch('http://localhost:5000/auth/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const data = await response.json();
                    setErrorMessage(data.message || 'Failed to fetch profile');
                } else {
                    const data = await response.json();
                    setUserData(data);
                }
            } catch (error) {
                setErrorMessage('An error occurred while fetching the profile');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return userData.roles.includes('ADMIN') ? true : false;
}

export default useLocateAdmin;
