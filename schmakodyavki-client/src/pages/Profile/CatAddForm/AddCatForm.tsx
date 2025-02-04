import React, {useState, FormEvent} from 'react';

export const AddCatForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        breed: 'unknown',
        sex: 'unknown',
        age: '',
        story: '',
        img: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/cats/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add cat');
            }
            setFormData({name: '', breed: 'unknown', sex: 'unknown', age: '', story: '', img: ''});
            setIsModalOpen(false); // Закрыть модальное окно при успешной отправке
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <div>
            <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-PaleTaupe text-white font-bold py-2 px-4 rounded-md hover:bg-Diesel duration-200"
            >
                Add Cat
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 text-BlackOlive">
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div className="relative bg-white w-full max-w-lg mx-auto p-6 rounded-md shadow-lg z-10">
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-2xl font-bold mb-4">Add a New Cat</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2"
                                       htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Musya"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-BridalHealth"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2"
                                       htmlFor="breed">Breed</label>
                                <select
                                    name="breed"
                                    id="breed"
                                    value={formData.breed}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-BridalHealth"
                                >
                                    <option value="">Select breed</option>
                                    <option value="angora">angora</option>
                                    <option value="british">british</option>
                                    <option value="persian">exot</option>
                                    <option value="kornish rex">kornish rex</option>
                                    <option value="persian">persian</option>
                                    <option value="scottish">scottish</option>
                                    <option value="sfinks">sfinks</option>
                                    <option value="siberian">siberian</option>
                                    <option value="vatnaya palochka">vatnaya palochka</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2"
                                       htmlFor="sex">Sex</label>
                                <select
                                    name="sex"
                                    id="sex"
                                    value={formData.sex}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-BridalHealth"
                                >
                                    <option value="">Select sex</option>
                                    <option value="M">M</option>
                                    <option value="F">F</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2" htmlFor="age">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    id="age"
                                    placeholder="12"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-BridalHealth"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2"
                                       htmlFor="story">Story</label>
                                <textarea
                                    name="story"
                                    id="story"
                                    placeholder="This story of my cat..."
                                    value={formData.story}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-BridalHealth"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2" htmlFor="img">Image
                                    URL</label>
                                <input
                                    type="text"
                                    name="img"
                                    id="img"
                                    placeholder="doesnt work..."
                                    value={formData.img}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-BridalHealth"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-PaleTaupe text-white font-bold py-2 px-4 rounded-md hover:bg-Diesel duration-200"
                            >
                                Add Cat
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
