import React, { useState, useEffect } from 'react';
import { useLastPathElement } from "../../../hooks/useLastPathElement";

// Интерфейс для данных о породе
interface Breed {
    _id: string;
    name: string;
    description: string;
    character: string;
    appearance: string;
}

export const BreedInfo = () => {
    const breed = useLastPathElement(); // Получаем имя породы из пути
    const [breedData, setBreedData] = useState<Breed | null>(null); // Данные о породе
    const [error, setError] = useState<string>(""); // Ошибка, если порода не найдена

    // Состояния для редактирования
    const [updatedDescription, setUpdatedDescription] = useState<string>('');
    const [updatedCharacter, setUpdatedCharacter] = useState<string>('');
    const [updatedAppearance, setUpdatedAppearance] = useState<string>('');

    useEffect(() => {
        const fetchBreedData = async () => {
            try {
                const response = await fetch('http://localhost:5000/admin/getAllBreedsInfo');
                if (!response.ok) {
                    throw new Error('Failed to fetch breed data');
                }
                const data = await response.json();

                const breedInfo = data.breeds.find((item: Breed) => item.name.toLowerCase() === breed.toLowerCase());
                if (breedInfo) {
                    setBreedData(breedInfo);
                    setUpdatedDescription(breedInfo.description);
                    setUpdatedCharacter(breedInfo.character);
                    setUpdatedAppearance(breedInfo.appearance);
                } else {
                    setError("Breed not found");
                }
            } catch (err) {
                setError("Error fetching breed data");
                console.error("Error fetching breed data:", err);
            }
        };

        fetchBreedData();
    }, [breed]); // Перезапуск при изменении породы

    // Обновление данных породы
    const handleUpdateBreed = async () => {
        if (!breedData) return;

        const updatedBreedData = {
            oldBreedName: breedData.name,
            newBreedName: breedData.name,
            description: updatedDescription,
            character: updatedCharacter,
            appearance: updatedAppearance
        };

        try {
            const response = await fetch('http://localhost:5000/admin/updateBreed', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBreedData),
            });

            if (!response.ok) {
                throw new Error('Failed to update breed');
            }

            const result = await response.json();
            console.log(result);
            alert('Breed updated successfully');
        } catch (error) {
            console.error('Error updating breed:', error);
            alert('Error updating breed');
        }
    };

    return (
        <section className="w-full h-auto bg-PaleTaupe flex flex-col justify-center items-center pb-6">
            <div className="flex flex-col justify-between items-center max-w-[1680px] w-full">
                <div className="w-full flex flex-col justify-start">
                    <h2 className="text-[64px] uppercase font-bold text-BlackOlive xs:text-[32px] md:text-[48px]">{breed}</h2>
                </div>
                <>
                    {breedData ? (
                        <div className="w-full h-full flex flex-row space-x-4 lg:flex-col">
                            <img
                                src={`/breeds/${breed}.jpg`}
                                alt={`${breed} cat`}
                                className="rounded-md select-none max-w-[420px] max-h-[420px] w-full h-full"
                                width="420px"
                                height="420px"
                            />
                            <div
                                className="flex flex-col justify-start items-start space-y-4 text-[20px] text-BlackOlive ml-4 lg:text-[14px] xl:text-[16px] w-full">
                                <div className="flex flex-col w-full">
                                    <h3 className="text-[24px] font-bold">Description</h3>
                                    <textarea
                                        value={updatedDescription}
                                        onChange={(e) => setUpdatedDescription(e.target.value)}
                                        className="p-2 border rounded-md w-auto"
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <h3 className="text-[24px] font-bold">Character</h3>
                                    <textarea
                                        value={updatedCharacter}
                                        onChange={(e) => setUpdatedCharacter(e.target.value)}
                                        className="p-2 border rounded-md w-full resize-none"
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <h3 className="text-[24px] font-bold">Appearance</h3>
                                    <textarea
                                        value={updatedAppearance}
                                        onChange={(e) => setUpdatedAppearance(e.target.value)}
                                        className="p-2 border rounded-md w-full resize-none"
                                    />
                                </div>
                                <button
                                    onClick={handleUpdateBreed}
                                    className="mt-4 bg-PaleTaupe border-2 border-Diesel text-Diesel py-2 px-4 rounded-md hover:bg-BridalHealth duration-200"
                                >
                                    Update Breed Info
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-[20px] text-red-500">{error}</p>
                    )}
                </>
            </div>
        </section>
    );
};
