import React, { useState } from 'react';
import { Link } from "react-router-dom";
import LoadingBreed from "../../../components/Loading/Breeds";

type BreedProps = {
    breed: string;
}

export const Breed: React.FC<BreedProps> = ({ breed }) => {
    const [loading, setLoading] = useState(true); // Состояние загрузки

    return (
        <Link to={`/Breeds/${breed}`} className="w-full h-full flex flex-col justify-between items-center cursor-pointer text-center breed__card">
            {loading && <LoadingBreed />} {/* Показать индикатор загрузки */}
            <img
                title={`${breed} cat`}
                src={`/breeds/${breed}.jpg`} // Путь к изображению
                alt={`${breed} cat`} // Текст для атрибута alt
                width="380px"
                height="380px"
                className={`breed-image rounded-md ${loading ? 'hidden' : ''} select-none`} // Применение стилей в зависимости от состояния загрузки
                onLoad={() => setLoading(false)} // Скрыть индикатор загрузки после загрузки изображения
                onError={() => { // Обработка ошибок при загрузке изображения
                    console.error(`Error loading for breed: ${breed}`);
                    setLoading(false); // Прекращаем отображать индикатор загрузки
                }}
            />
            <h2
                title={`breed ${breed}`}
                aria-label={`breed ${breed}`} // Доступность
                className="breed text-[52px] font-bold text-BridalHealth uppercase xs:text-[18px] md:text-[24px] lg:text-[32px]"
            >
                {breed}
            </h2>
        </Link>
    );
}
