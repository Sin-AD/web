import React, {useState, useEffect} from 'react';
import AddCatForm from './CatAddForm';
import CatsByBreed from './CatsById';
import QuitButton from "../../components/QuitButton";

export const Profile: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

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

    if (loading) return <p>Loading...</p>;

    if (errorMessage) return <p>{errorMessage}</p>;

    console.log(userData);

    return (
        <div className="p-8 flex flex-col justify-center items-center max-w-[1680px] w-full text-BlackOlive">
            {userData ? (
                <div className="space-y-4 w-full h-auto">
                    <div className="w-auto h-auto flex flex-col items-center">
                        <img
                            src="/icons/cat.svg"
                            alt="user"
                            className="w-full h-full max-w-[400px] max-h-[400px]"
                            width="400px"
                            height="400px"
                        />
                        <div className="flex flex-col justify-start items-center">
                            <p className="text-[96px] lg:text-[72px] md:text-[52px]"><strong>{userData.username}</strong></p>
                            <p>{userData.description || 'No description available'}</p>
                        </div>
                        {
                            userData.git === 'git'
                                ? <div className="text-red-600 text-[24px] font-bold">Authorized from GitHub</div>
                                : null
                        }
                    </div>
                    <QuitButton />
                    <AddCatForm/>
                    <div className="w-full h-auto flex flex-col items-center">
                        <h2 className="text-[48px]"><strong>My Kittys! :3</strong></h2>
                        <CatsByBreed cats={userData.cats}/>
                    </div>
                </div>
            ) : (
                <p>Error user data</p>
            )}
        </div>
    );
};
