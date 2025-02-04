import React, { useEffect, useState } from 'react';
import Breed from "../BreedComp"; // Импорт компонента Breed для отображения пород

export const AllBreeds = () => {
    // Состояния для хранения данных, статуса загрузки и ошибок
    const [breeds, setBreeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Запрос для получения данных о породах
    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const response = await fetch('http://localhost:5000/admin/AllBreeds');
                if (!response.ok) {
                    throw new Error('Ошибка загрузки данных');
                }
                const data = await response.json();  // Обрабатываем данные в формате JSON
                setBreeds(data.breeds);  // Сохраняем данные в состояние
            } catch (error) {
                setError("error");  // Устанавливаем ошибку
            } finally {
                setLoading(false);  // После завершения запроса скрываем индикатор загрузки
            }
        };

        fetchBreeds();  // Вызов функции для получения данных
    }, []); // Запрос выполняется только при монтировании компонента

    // Если идет загрузка, показываем индикатор загрузки
    if (loading) {
        return <div>Loading...</div>;
    }

    // Если произошла ошибка, отображаем сообщение об ошибке
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Отображаем список пород кошек
    return (
        <div className="grid grid-cols-4 gap-8 sm:grid-cols-1 md:grid-cols-2 max-w-[1680px] w-full items-center justify-center">
            {
                // Отображаем компонент Breed для каждой породы
                breeds.map((breed, index) => (
                    <Breed key={index} breed={breed} />
                ))
            }
        </div>
    );
};
