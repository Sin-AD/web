import React, { useEffect, useRef, useState } from 'react';  // Импортируем необходимые модули React и другие библиотеки
import { Link } from 'react-router-dom';  // Для навигации по страницам
import { gsap } from 'gsap';  // Для анимации с использованием GSAP

export const Header = () => {
    // Рефы для различных частей хедера
    const navRef = useRef(null);  // Ссылка на элемент навигации (для desktop)
    const mobNavRef = useRef(null);  // Ссылка на мобильную навигацию
    const headerRef = useRef(null);  // Ссылка на сам хедер
    const [isActive, setIsActive] = useState(false);  // Состояние для отслеживания активности меню

    // Функция обработки скроллинга страницы
    const handleScroll = () => {
        const offset = window.scrollY;  // Получаем текущее положение прокрутки

        if (offset > 20) {  // Если скролл больше 20px, применяем анимацию
            gsap.to(navRef.current, {  // Применяем анимацию к элементу навигации
                duration: 0.1,
                y: -136,  // Сдвигаем навигацию вверх
                opacity: 1,  // Делаем её видимой
                ease: "power2.out",  // Эффект анимации
            });
            gsap.to(mobNavRef.current, {  // Применяем анимацию к мобильной навигации
                duration: 0.1,
                y: -132,  // Сдвигаем мобильную навигацию
                opacity: 1,
                ease: "power2.out",
            });
            gsap.to(headerRef.current, {  // Изменяем стиль хедера
                duration: 0.1,
                backgroundColor: '#fffbf4',  // Меняем фон
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',  // Добавляем тень
                ease: "power2.out",
            });
        } else {  // Если скролл меньше 20px, сбрасываем изменения
            gsap.to(navRef.current, {  // Возвращаем позицию навигации на место
                duration: 0.1,
                y: 0,
                opacity: 1,
                ease: "power2.out",
            });
            gsap.to(mobNavRef.current, {  // Возвращаем мобильную навигацию на место
                duration: 0.1,
                y: 0,
                opacity: 1,
                ease: "power2.out",
            });
            gsap.to(headerRef.current, {  // Сбрасываем стили хедера
                duration: 0.1,
                backgroundColor: 'transparent',  // Возвращаем прозрачный фон
                boxShadow: 'none',  // Убираем тень
                ease: "power2.out",
            });
        }
    };

    useEffect(() => {
        // Добавляем обработчик события прокрутки страницы
        window.addEventListener('scroll', handleScroll);
        return () => {
            // Убираем обработчик события при размонтировании компонента
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Функция для переключения состояния меню
    const handleMenuToggle = (isAnimating: boolean, menu: Element, nav: Element | null, burger: Element) => {
        if (isAnimating) return;  // Если анимация уже происходит, ничего не делать
        isAnimating = true;  // Включаем флаг анимации
        const isHidden = menu.classList.contains("hidden");  // Проверяем, скрыто ли меню

        burger.classList.toggle("active");  // Переключаем класс активности бургера
        if (isHidden) {  // Если меню скрыто, показываем его
            menu.classList.remove("hidden");
            nav && nav.classList.add("flex");  // Добавляем класс для отображения навигации
            gsap.fromTo(menu, { x: "200%" }, {  // Анимация появления меню
                x: "0%",
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => {
                    isAnimating = false;  // Завершаем анимацию
                },
            });
        } else {  // Если меню открыто, скрываем его
            gsap.to(menu, {
                x: "200%",
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => {
                    menu.classList.add("hidden");
                    nav && nav.classList.remove("flex");  // Убираем класс для скрытия навигации
                    isAnimating = false;  // Завершаем анимацию
                },
            });
        }
    };

    useEffect(() => {
        const menu = document.querySelector("#menu");  // Находим меню по id
        const nav = document.querySelector("#nav");  // Находим навигацию по id
        const burger = document.querySelector(".burger-container");  // Находим элемент бургера

        if (!menu || !burger) return;  // Если один из элементов не найден, ничего не делать

        let isAnimating = false;  // Флаг для отслеживания анимации

        const handleClick = () => handleMenuToggle(isAnimating, menu, nav, burger);  // Обработчик клика по бургеру
        burger.addEventListener("click", handleClick);  // Добавляем обработчик события клика

        return () => {
            burger.removeEventListener("click", handleClick);  // Убираем обработчик при размонтировании компонента
        };
    }, []);

    // Функция для переключения состояния активного меню
    const toggleMenu = () => {
        setIsActive(!isActive);  // Переключаем состояние меню
    };

    return (
        <header ref={headerRef}
                className={`relative top-0 left-0 w-full flex flex-col items-center px-8 transition-all duration-300`}>
            {/* Логотип */}
            <div title="site-logo" className="w-full h-auto flex justify-between md:justify-center">
                <div className="w-[100px] h-[100px] md:hidden"></div>
                <div className="flex flex-col justify-center items-center">
                    <Link to={`/Home`}>
                        <img
                            src="/logo.svg"
                            alt="Site logo"
                            className="w-[100px] h-auto select-none"
                            width="100px"
                            height="100px"
                        />
                    </Link>
                    <h1 title="site name" className="text-[24px] font-bold">Schmakodyavki</h1>
                </div>
                <Link to={`/profile`} className="w-[100px] h-[100px] flex justify-center items-center md:hidden">
                    <img
                        src="/profile.svg"
                        alt="user profile"
                        aria-labelledby="user profile"
                        className="w-[40px] h-[40px] cursor-pointer select-none"
                    />
                </Link>
            </div>

            {/* desktop версия навигации */}
            <nav
                aria-labelledby="navigation"
                ref={navRef}
                className={`w-full fixed top-[136px] left-0 transition-all duration-300 md:hidden my-0 z-40 bg-BridalHealth`}>
                <ul className="flex justify-center space-x-20">
                    {['Home', 'Breeds', 'All Kitty', 'Users'].map((item, index) => (
                        <li key={index} className="relative h-auto px-4 py-2">
                            <Link to={`/${item.replaceAll(" ", "")}`} title={`navigate to ${item.split(" ")}`} className="text-[20px] text-black link">
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* mobile версия навигации */}
            <nav id="menu" className="relative hidden w-full  top-[-136px] z-60" ref={mobNavRef}>
                <ul id="nav" className="w-full absolute top-[0] bg-Manhattan flex-col items-center">
                    {['Home', 'Breeds', 'All Kitty', 'Users'].map((item) => (
                        <li key={item} className="text-BlackOlive py-3 w-full text-center transition-all hover:bg-Manhattan">
                            <Link className="w-full bg-transparent" to={`/${item.replaceAll(" ", "")}`}>{item}</Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Бургер меню */}
            <div
                className={`flex flex-row justify-between w-full fixed top-[132px] left-0 transition-all duration-300 px-8 bg-BridalHealth z-20 ${isActive ? 'relative' : ''}`}
                ref={mobNavRef}>
                <button className={`burger-container hidden md:block content-center ${isActive ? 'active' : ''}`}
                        onClick={toggleMenu}>
                    <div className="burger-item top-line"></div>
                    <div className="burger-item mid-line"></div>
                    <div className="burger-item bot-line"></div>
                </button>

                <Link to={`/profile`} className="w-auto h-auto flex justify-center items-center hidden md:block">
                    <img
                        src="/profile.svg"
                        alt="user profile"
                        aria-labelledby="user profile"
                        className="w-[40px] h-[40px] cursor-pointer select-none"
                    />
                </Link>
            </div>
        </header>
    );
};
