import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

// Компонент Header - отвечает за отображение шапки сайта с логотипом, навигацией и бургер-меню
export const Header = () => {
    // Ссылки на элементы, которые будут анимироваться или использоваться для проверки состояния
    const navRef = useRef(null);  // Для навигации на десктопе
    const mobNavRef = useRef(null);  // Для мобильной навигации
    const headerRef = useRef(null);  // Для всего хедера
    const [isActive, setIsActive] = useState(false);  // Состояние для отслеживания активности бургер-меню

    // Функция для обработки прокрутки страницы
    const handleScroll = () => {
        const offset = window.scrollY;  // Получаем текущее положение прокрутки

        // Если прокрутка больше 20px, анимируем элементы
        if (offset > 20) {
            gsap.to(navRef.current, {
                duration: 0.1,
                y: -136,  // Сдвигаем навигацию вверх
                opacity: 1,  // Делаем её видимой
                ease: "power2.out",  // Плавная анимация
            });
            gsap.to(mobNavRef.current, {
                duration: 0.1,
                y: -132,  // Сдвигаем мобильную навигацию
                opacity: 1,
                ease: "power2.out",
            });
            gsap.to(headerRef.current, {
                duration: 0.1,
                backgroundColor: '#fffbf4',  // Фон становится светлым
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',  // Добавляем тень
                ease: "power2.out",
            });
        } else {
            // Если прокрутка меньше 20px, возвращаем элементы в исходное положение
            gsap.to(navRef.current, {
                duration: 0.1,
                y: 0,  // Снимаем сдвиг
                opacity: 1,
                ease: "power2.out",
            });
            gsap.to(mobNavRef.current, {
                duration: 0.1,
                y: 0,
                opacity: 1,
                ease: "power2.out",
            });
            gsap.to(headerRef.current, {
                duration: 0.1,
                backgroundColor: 'transparent',  // Фон снова прозрачный
                boxShadow: 'none',  // Убираем тень
                ease: "power2.out",
            });
        }
    };

    // useEffect для добавления слушателя события прокрутки
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);  // Добавляем обработчик прокрутки
        return () => {
            window.removeEventListener('scroll', handleScroll);  // Убираем обработчик при размонтировании компонента
        };
    }, []);

    // Функция для переключения состояния бургер-меню (открытие и закрытие)
    const handleMenuToggle = (isAnimating: boolean, menu: Element, nav: Element | null, burger: Element) => {
        if (isAnimating) return;  // Если идет анимация, ничего не делаем
        isAnimating = true;  // Запускаем анимацию
        const isHidden = menu.classList.contains("hidden");  // Проверяем, скрыто ли меню

        burger.classList.toggle("active");  // Переключаем класс для бургер-меню
        if (isHidden) {
            menu.classList.remove("hidden");  // Показываем меню
            nav && nav.classList.add("flex");  // Делаем навигацию гибкой
            gsap.fromTo(menu, { x: "200%" }, {  // Анимируем вход меню
                x: "0%",
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => {
                    isAnimating = false;  // Завершаем анимацию
                },
            });
        } else {
            gsap.to(menu, {  // Анимируем выход меню
                x: "200%",
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => {
                    menu.classList.add("hidden");  // Скрываем меню
                    nav && nav.classList.remove("flex");  // Убираем гибкость с навигации
                    isAnimating = false;  // Завершаем анимацию
                },
            });
        }
    };

    // useEffect для добавления обработчика клика на бургер-меню
    useEffect(() => {
        const menu = document.querySelector("#menu");
        const nav = document.querySelector("#nav");
        const burger = document.querySelector(".burger-container");

        if (!menu || !burger) return;  // Если элементы не найдены, выходим

        let isAnimating = false;  // Переменная для отслеживания анимации

        const handleClick = () => handleMenuToggle(isAnimating, menu, nav, burger);  // Обработчик клика
        burger.addEventListener("click", handleClick);  // Добавляем событие клика

        return () => {
            burger.removeEventListener("click", handleClick);  // Убираем событие при размонтировании компонента
        };
    }, []);

    // Функция для изменения состояния бургер-меню
    const toggleMenu = () => {
        setIsActive(!isActive);  // Переключаем состояние
    };

    return (
        <header ref={headerRef} className={`relative top-0 left-0 w-full flex flex-col items-center px-8 transition-all duration-300`}>
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

            {/* Навигация для десктопной версии */}
            <nav
                aria-labelledby="navigation"
                ref={navRef}
                className={`w-full fixed top-[136px] left-0 transition-all duration-300 md:hidden my-0 z-40 bg-BridalHealth`}
            >
                <ul className="flex justify-center space-x-20">
                    {['Home', 'Breeds', 'All Kitty', 'Community'].map((item, index) => (
                        <li key={index} className="relative h-auto px-4 py-2">
                            <Link to={`/${item.replaceAll(" ", "")}`} title={`navigate to ${item.split(" ")}`} className="text-[20px] text-black link">
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Навигация для мобильной версии */}
            <nav id="menu" className="relative hidden w-full top-[-136px] z-60" ref={mobNavRef}>
                <ul id="nav" className="w-full absolute top-[0] bg-Manhattan flex-col items-center">
                    {['Home', 'Breeds', 'All Kitty', 'Community'].map((item) => (
                        <li key={item} className="text-BlackOlive py-3 w-full text-center transition-all hover:bg-Manhattan">
                            <Link className="w-full bg-transparent" to={`/${item.split(" ")}`}>{item}</Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Бургер-меню */}
            <div
                className={`flex flex-row justify-between w-full fixed top-[132px] left-0 transition-all duration-300 px-8 bg-BridalHealth z-20 ${isActive ? 'relative' : ''}`}
                ref={mobNavRef}
            >
                <button className={`burger-container hidden md:block content-center ${isActive ? 'active' : ''}`} onClick={toggleMenu}>
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
