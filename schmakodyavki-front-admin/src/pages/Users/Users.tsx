import React, {useEffect, useState} from 'react';

interface User {
    _id: string;
    username: string;
    roles: string[];
    description?: string;
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    // Функция для получения всех пользователей с сервера
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/admin/getAllUsers');
            if (response.ok) {
                const data = await response.json();
                setUsers(data);  // Сохраняем данные о пользователях в состояние
            } else {
                setError('Failed to fetch users');
            }
        } catch (error) {
            setError('Error fetching users');
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId: string) => {
        try {
            const response = await fetch(`http://localhost:5000/admin/deleteUser`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId: userId })
            });

            if (response.ok) {
                console.log('Пользователь успешно удален');
                alert('Пользователь успешно удален');
            } else {
                console.error('Ошибка при удалении пользователя');
            }
            window.location.reload(); //обновление страницы
        } catch (error) {
            console.error('Ошибка сети:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="w-full m-8">
            <h2 className="text-[48px] text-Diesel font-bold mb-4">Users List</h2>
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <ul className="list-none">
                    {users.map((user: User) => (
                        <li key={user._id} className="bg-LightPaleTaupe text-Diesel p-4 mb-2 rounded-md">
                            <div>
                                <h3 className="text-xl">{user.username}</h3>
                                <p>{user.description || 'No description'}</p>
                                <div className="flex flex-row">
                                    Roles: {user.roles.map((role) => (<p>{role}, </p>))}
                                </div>
                                <button
                                    className="text-white w-full h-full bg-BlackOlive hover:bg-PaleTaupe hover:text-Diesel duration-200"
                                    onClick={() => deleteUser(user.username)}
                                >
                                    Удалить
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Users;
