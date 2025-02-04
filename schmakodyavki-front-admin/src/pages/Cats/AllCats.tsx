import React, { useState, useEffect } from 'react';
import AddCatForm from "../Profile/CatAddForm";

interface Kitty {
    _id: string;
    name: string;
    breed: string;
    sex: string;
    age: number;
    story: string;
    img: string;
}

export const AllCats = () => {
    const [kitties, setKitties] = useState<Kitty[]>([]);
    const [editingKittyId, setEditingKittyId] = useState<string | null>(null);
    const [editedKittyData, setEditedKittyData] = useState<{ [key: string]: string | number }>({});

    useEffect(() => {
        const fetchAllCats = async () => {
            try {
                const response = await fetch('http://localhost:5000/cats/allCats', {
                    method: 'GET',
                });

                if (response.ok) {
                    const data = await response.json();
                    setKitties(data);
                } else {
                    throw new Error('Failed to fetch cats');
                }
            } catch (e) {
                console.error(e);
                alert('Failed to fetch cats');
            }
        };

        fetchAllCats();
    }, []);

    const handleEdit = (kitty: Kitty) => {
        setEditingKittyId(kitty._id);
        setEditedKittyData({ ...kitty });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, field: keyof Kitty) => {
        const { name, value } = e.target;

        // Если имя пустое, не обновляем его в состоянии
        if (name === "name" && value.trim().length === 0) {
            return;
        }

        setEditedKittyData((prev) => {
            if (!prev) return {}; // Если предыдущее состояние пустое, возвращаем пустой объект.

            return { ...prev, [name]: value }; // Обновляем только нужное поле
        });
    };

    const handleUpdate = async () => {
        if (editingKittyId) {
            try {
                // Создаем объект с редактируемыми данными
                const updatedKitty = { id: editingKittyId, ...editedKittyData };

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
                    setKitties(kitties.map((kitty) => (kitty._id === data._id ? data : kitty)));
                    setEditingKittyId(null);
                    setEditedKittyData({});
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

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:5000/admin/deleteCat`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                setKitties(kitties.filter((kitty) => kitty._id !== id));
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
        <div className="flex flex-col gap-4">
            <AddCatForm />
            {kitties.map((kitty) => (
                <div key={kitty._id} className="w-full h-auto flex flex-row justify-start mb-4">
                    <img src={`/breeds/angora.jpg`} alt={kitty.name} className="rounded-md mr-4 max-w-[300px] max-h-[300px]" />
                    <div className="flex flex-col justify-around w-full h-full">
                        <div className="w-full h-full flex flex-row justify-center items-baseline text-[20px]">
                            <input
                                title="kitty name"
                                className="text-[64px] font-bold"
                                name="name"  // Добавлен атрибут name
                                value={editedKittyData.name || kitty.name}
                                onChange={(e) => handleInputChange(e, 'name')}
                                disabled={editingKittyId !== kitty._id}
                            />
                            <input
                                title="kitty age"
                                className="lg:text-[16px]"
                                name="age"  // Добавлен атрибут name
                                value={editedKittyData.age || kitty.age}
                                onChange={(e) => handleInputChange(e, 'age')}
                                disabled={editingKittyId !== kitty._id}
                            />
                        </div>
                        <div className="text-left">
                            <span>Breed:
                                <input
                                    title="kitty breed"
                                    name="breed"  // Добавлен атрибут name
                                    className="font-normal"
                                    value={editedKittyData.breed || kitty.breed}
                                    onChange={(e) => handleInputChange(e, 'breed')}
                                    disabled={editingKittyId !== kitty._id}
                                />
                            </span>
                            <span>Story:
                                <input
                                    name="story"  // Добавлен атрибут name
                                    className="font-normal"
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
        </div>
    );
};
