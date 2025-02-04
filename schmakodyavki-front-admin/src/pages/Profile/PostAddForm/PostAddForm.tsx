import React, {  useState, FormEvent } from 'react';

export const PostAddForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        kitty: '',
        img: null,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('kitty', formData.kitty);
        if (formData.img) {
            data.append('image', formData.img); // Здесь мы добавляем файл изображения
        }

        try {
            const response = await fetch('http://localhost:5000/posts/add', {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                throw new Error('Failed to add post');
            }

            // Сброс состояния формы
            setFormData({ title: '', description: '', kitty: '', img: null });
            setIsModalOpen(false); // Закрыть модальное окно при успешной отправке
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-PaleTaupe text-white font-bold py-2 px-4 rounded-md hover:bg-Diesel duration-200"
            >
                Add Post
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 text-BlackOlive">
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div className="relative bg-white w-full max-w-lg mx-auto p-6 rounded-md shadow-lg z-10">
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-2xl font-bold mb-4">Add a New Post</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2" htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Enter post title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-BridalHealth"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2" htmlFor="description">Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    placeholder="Enter post description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-BridalHealth"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2" htmlFor="kitty">Kitty</label>
                                <select
                                    name="kitty"
                                    id="kitty"
                                    value={formData.kitty}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-BridalHealth"
                                >
                                    <option value="" disabled>Select a kitty</option>
                                    {[].map((kitty) => (
                                        <option key={kitty} value={kitty}>
                                            {kitty}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-PaleTaupe text-white font-bold py-2 px-4 rounded-md hover:bg-Diesel duration-200"
                            >
                                Add Post
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
