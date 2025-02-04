import React, {useEffect, useState} from 'react'; // Импортируем React и хуки useEffect и useState для работы с состоянием и побочными эффектами
import Helmet from "react-helmet"; // Импортируем Helmet для работы с мета-данными страницы
import BreedInfo from './BreedInfo'; // Импортируем компонент, который отображает информацию о породе
import {useLocation} from 'react-router-dom'; // Импортируем хук useLocation для работы с текущим путем URL

// Описание интерфейса для данных кошки
interface Kitty {
    _id: string; // Уникальный идентификатор кошки
    name: string; // Имя кошки
    breed: string; // Порода кошки
    sex: string; // Пол кошки
    age: number; // Возраст кошки
    story: string; // История кошки
    img: string; // Изображение кошки
}

// Словарь данных для разных пород кошек, с информацией для SEO (заголовки, описание, ключевые слова)
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

// Основной компонент для страницы породы
export const Breed = () => {
    const location = useLocation(); // Получаем информацию о текущем пути
    const splitLocation = location.pathname.split('/'); // Разбиваем путь по слешам
    const breed = splitLocation[splitLocation.length - 1].toLowerCase().replace(/-/g, ' ').replace(/%20/g, ' '); // Получаем породу из URL

    const breedInfo = breedData[breed] || breedData['unknown']; // Получаем информацию о породе или по умолчанию информацию для неизвестной породы

    const [kitties, setKitties] = useState<Kitty[]>([]); // Состояние для списка кошек этой породы
    const [editingKittyId, setEditingKittyId] = useState<string | null>(null); // Состояние для редактирования конкретной кошки
    const [editedKittyData, setEditedKittyData] = useState<{ [key: string]: string | number }>({}); // Состояние для данных редактируемой кошки

    // Загрузка всех кошек по породе при монтировании компонента
    useEffect(() => {
        const fetchAllCatsByBreed = async () => {
            try {
                const response = await fetch(`http://localhost:5000/cats/catsByBreed`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${1}`, // Предположительно, токен или ID для авторизации
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ breed: breed }), // Отправка запроса с породой
                });

                if(response.ok) {
                    const data = await response.json();
                    setKitties(data); // Обновляем состояние с кошками
                }
            } catch (e) {
                console.error(e);
                throw new Error(`Failed to fetch Cats: ${e}`);
            }
        }

        fetchAllCatsByBreed(); // Вызов функции для загрузки данных
    }, []); // useEffect вызывается только при монтировании компонента

    // Функция для начала редактирования кошки
    const handleEdit = (kitty: Kitty) => {
        setEditingKittyId(kitty._id); // Устанавливаем редактируемую кошку по ID
        setEditedKittyData({ ...kitty }); // Копируем данные кошки в состояние редактирования
    };

    // Функция для обработки изменения данных кошки
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Kitty) => {
        setEditedKittyData({
            ...editedKittyData,
            [field]: e.target.value, // Обновляем поле в данных редактируемой кошки
        });
    };

    // Функция для обновления данных кошки на сервере
    const handleUpdate = async () => {
        if (editingKittyId) {
            try {
                const updatedKitty = { id: editingKittyId, ...editedKittyData }; // Формируем объект с обновленными данными

                console.log("Updating kitty with ID:", updatedKitty.id);

                // Отправляем обновленные данные на сервер
                const response = await fetch(`http://localhost:5000/admin/updateCat`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedKitty),
                });

                if (response.ok) {
                    const data = await response.json();
                    setKitties(kitties.map((kitty) => (kitty._id === data._id ? data : kitty))); // Обновляем список кошек
                    setEditingKittyId(null); // Закрываем режим редактирования
                    setEditedKittyData({}); // Сбрасываем редактируемые данные
                    alert('Kitty updated successfully!');
                } else {
                    throw new Error('Failed to update kitty');
                }
            } catch (error) {
                console.error('Error updating kitty:', error);
                alert('Failed to update kitty');
            }
        }
    };

    // Функция для удаления кошки
    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:5000/admin/deleteCat`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }), // Отправляем ID кошки для удаления
            });

            if (response.ok) {
                setKitties(kitties.filter((kitty) => kitty._id !== id)); // Обновляем список после удаления
                alert('Kitty deleted successfully!');
            } else {
                throw new Error('Failed to delete kitty');
            }
        } catch (error) {
            console.error('Error deleting kitty:', error);
            alert('Failed to delete kitty');
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            {/* Использование Helmet для обновления мета-данных страницы */}
            <Helmet>
                <title>{breedInfo.title}</title> {/* Заголовок страницы */}
                <meta name="description" content={breedInfo.description}/> {/* Описание страницы */}
                <meta name="keywords" content={breedInfo.keywords}/> {/* Ключевые слова */}
                <meta name="robots" content="index, follow"/> {/* Инструкция для поисковых систем */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/> {/* Поддержка мобильных устройств */}

                {/* Open Graph для социальных сетей */}
                <meta property="og:title" content={breedInfo.title}/>
                <meta property="og:description" content={breedInfo.description}/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={`https://localhost:3000/Breeds/${breed}`}/>
                <meta property="og:image" content="/cat.svg"/>

                {/* Twitter Card для отображения в Twitter */}
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={breedInfo.title}/>
                <meta name="twitter:description" content={breedInfo.description}/>
                <meta name="twitter:image" content="/cat.svg"/>
            </Helmet>

            <BreedInfo/> {/* Компонент, который отображает информацию о породе */}
            <h2 className="text-[64px] text-BlackOlive font-bold uppercase md:text-[48px] xs:text-[32px]">
                All {breed} kitty's on site
            </h2>

            {/* Секция с котами породы */}
            <section className="flex flex-col justify-between items-center mt-2 w-full text-center max-w-[1480px]">
                {kitties.map((kitty) => (
                    <div key={kitty._id} className="w-full h-auto flex flex-row justify-start mb-4 md:flex-col">
                        <img src={`/breeds/angora.jpg`} alt={kitty.name} className="rounded-md mr-4 max-w-[300px] max-h-[300px]" />
                        <div className="flex flex-col justify-around w-full h-full">
                            <div className="w-full h-full flex flex-row justify-center items-baseline text-[20px] relative left-0 lg:flex-col">
                                <input
                                    title="kitty name"
                                    className="text-[64px] font-bold w-auto lg:text-[48px] md:text-[32px]"
                                    value={editedKittyData.name || kitty.name}
                                    onChange={(e) => handleInputChange(e, 'name')}
                                    disabled={editingKittyId !== kitty._id} // Только при редактировании кошки разрешается изменить данные
                                />
                                <input
                                    title="kitty age"
                                    className="lg:text-[16px] w-auto"
                                    value={editedKittyData.age || kitty.age}
                                    onChange={(e) => handleInputChange(e, 'age')}
                                    disabled={editingKittyId !== kitty._id}
                                />
                            </div>
                            <div className="text-left">
                            <span>Breed:
                                <input
                                    title="kitty breed"
                                    className="font-normal w-auto"
                                    value={editedKittyData.breed || kitty.breed}
                                    onChange={(e) => handleInputChange(e, 'breed')}
                                    disabled={editingKittyId !== kitty._id}
                                />
                            </span>
                                <span>Story:
                                <input
                                    className="font-normal w-auto"
                                    value={editedKittyData.story || kitty.story}
                                    onChange={(e) => handleInputChange(e, 'story')}
                                    disabled={editingKittyId !== kitty._id}
                                />
                            </span>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => handleDelete(kitty._id)}
                                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleEdit(kitty)}
                                    className="bg-PaleTaupe text-white p-2 rounded-md hover:bg-LightPaleTaupe transition-all duration-300"
                                >
                                    Edit
                                </button>
                                {editingKittyId === kitty._id && (
                                    <button
                                        onClick={handleUpdate}
                                        className="bg-PaleTaupe text-white p-2 rounded-md hover:bg-LightPaleTaupe transition-all duration-300"
                                    >
                                        Save Changes
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};
