import React, { useEffect, useState } from 'react';  // Импорт React и хука useState для управления состоянием
import Helmet from "react-helmet";  // Импорт компонента Helmet для управления мета-тегами в <head> страницы
import BreedInfo from './BreedInfo';  // Импорт компонента для отображения информации о породе
import { useLocation } from 'react-router-dom';  // Импорт useLocation для получения текущего пути
import KittyCard from "../Cats/KittyCard";  // Импорт компонента для отображения карточек с котиками

// Данные о породах в виде объекта, где ключ - это название породы, а значение - объект с мета-информацией
const breedData: Record<string, { title: string; description: string; keywords: string }> = {
    "angora": {
        title: "Angora Cat - Graceful and Elegant | Schmakodyavki",
        description: "Learn about the Angora cat, a breed known for its elegance, playful character, and stunning appearance.",
        keywords: "angora cat, elegant cat, graceful breed, pets, animal breeds"
    },
    "british": {
        title: "British Shorthair - Majestic and Loyal | Schmakodyavki",
        description: "Discover the British Shorthair, a calm and independent breed with a loyal and affectionate nature.",
        keywords: "british shorthair, loyal cat, majestic breed, pets, animal breeds"
    },
    "exot": {
        title: "Exotic Shorthair - Plush and Affectionate | Schmakodyavki",
        description: "The Exotic Shorthair cat, with its plush coat and friendly personality, is a perfect companion for any household.",
        keywords: "exotic shorthair, plush cat, affectionate breed, pets, animal breeds"
    },
    "kornish rex": {
        title: "Kornish Rex - Playful and Energetic | Schmakodyavki",
        description: "The Cornish Rex, known for its unique wavy coat and playful character, is a lively addition to any family.",
        keywords: "cornish rex, playful cat, energetic breed, pets, animal breeds"
    },
    "persian": {
        title: "Persian Cat - Calm and Beautiful | Schmakodyavki",
        description: "Learn about the Persian cat, a breed famous for its calm demeanor and luxurious long coat.",
        keywords: "persian cat, calm breed, beautiful cat, pets, animal breeds"
    },
    "scottish": {
        title: "Scottish Fold - Unique and Gentle | Schmakodyavki",
        description: "The Scottish Fold, with its distinct folded ears and gentle personality, is a truly unique breed.",
        keywords: "scottish fold, gentle cat, unique breed, pets, animal breeds"
    },
    "sfinks": {
        title: "Sphynx Cat - Affectionate and Unique | Schmakodyavki",
        description: "Meet the Sphynx, a hairless and affectionate breed known for its friendly and playful nature.",
        keywords: "sphynx cat, affectionate cat, unique breed, pets, animal breeds"
    },
    "siberian": {
        title: "Siberian Cat - Strong and Loyal | Schmakodyavki",
        description: "Explore the Siberian cat, a naturally evolved breed known for its strength, loyalty, and thick coat.",
        keywords: "siberian cat, strong breed, loyal cat, pets, animal breeds"
    },
    "unknown": {
        title: "Unknown Breed | Schmakodyavki",
        description: "This is a mysterious breed with unknown origins but full of charm and uniqueness.",
        keywords: "unknown breed, mystery cat, pets, animal breeds"
    },
    "vatnaya palochka": {
        title: "Vatnaya Palochka - The Mythical Cat | Schmakodyavki",
        description: "The Vatnaya Palochka is a fictional cat breed known for its quirky personality and mythical traits.",
        keywords: "vatnaya palochka, mythical cat, fictional breed, pets, animal breeds"
    }
};

// Основной компонент для отображения информации о породах
export const Breed = () => {
    const location = useLocation();  // Получаем текущий путь из URL
    const splitLocation = location.pathname.split('/');  // Разбиваем путь по слэшу
    // Извлекаем породу из последней части URL, приводим к нижнему регистру и заменяем дефисы и пробелы
    const breed = splitLocation[splitLocation.length - 1].toLowerCase().replace(/-/g, ' ').replace(/%20/g, ' ');

    // Если данные о породе найдены, используем их, иначе по умолчанию данные о неизвестной породе
    const breedInfo = breedData[breed] || breedData['unknown'];

    const [cats, setCats] = useState([]);  // Состояние для хранения списка котиков данной породы

    // useEffect для загрузки данных о котиках при монтировании компонента
    useEffect(() => {
        const fetchAllCatsByBreed = async () => {
            try {
                // Запрос на сервер для получения котиков по породе
                const response = await fetch(`http://localhost:5000/cats/catsByBreed`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${1}`,  // Здесь для теста используется заглушка авторизационного токена
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ breed: breed }),  // Отправляем данные о породе на сервер
                });

                if (response.ok) {  // Если ответ от сервера успешный
                    const data = await response.json();  // Получаем данные
                    setCats(data);  // Обновляем состояние котиков
                }
            } catch (e) {
                console.error(e);  // Логируем ошибку
                throw new Error(`Failed to fetch Cats: ${e}`);  // Бросаем ошибку, если запрос не удался
            }
        }

        fetchAllCatsByBreed();  // Вызываем функцию для загрузки данных о котиках
    }, []);  // Пустой массив зависимостей, значит, эффект выполнится только один раз при монтировании компонента

    console.log(cats);  // Логируем список котиков для отладки

    return (
        <div className="flex flex-col items-center w-full">
            {/* Управление мета-данными страницы с помощью Helmet */}
            <Helmet>
                <title>{breedInfo.title}</title>  {/* Заголовок страницы */}
                <meta name="description" content={breedInfo.description}/>  {/* Описание страницы */}
                <meta name="keywords" content={breedInfo.keywords}/>  {/* Ключевые слова */}
                <meta name="robots" content="index, follow"/>  {/* Инструкция для поисковых систем */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>  {/* Установка мета-тега для адаптивности */}

                {/* Open Graph для социальных сетей (Facebook, LinkedIn и т.д.) */}
                <meta property="og:title" content={breedInfo.title}/>
                <meta property="og:description" content={breedInfo.description}/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={`https://localhost:3000/Breeds/${breed}`}/>
                <meta property="og:image" content="/cat.svg"/>

                {/* Twitter Card для отображения на Twitter */}
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={breedInfo.title}/>
                <meta name="twitter:description" content={breedInfo.description}/>
                <meta name="twitter:image" content="/cat.svg"/>
            </Helmet>

            {/* Компонент для отображения информации о породе */}
            <BreedInfo/>

            {/* Заголовок с названием породы */}
            <h2 className="text-[64px] text-BlackOlive font-bold uppercase md:text-[48px] xs:text-[32px]">
                All {breed} kitty's on site
            </h2>

            {/* Секция с карточками котиков */}
            <section className="flex flex-col justify-between items-center mt-2 w-full text-center max-w-[1480px]">
                <KittyCard kittys={cats}/>  {/* Отображаем карточки котиков */}
            </section>
        </div>
    );
};
