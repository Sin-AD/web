import React from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./approuter/AppRouter";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Header/>

                <main className="relative top-[46px] pb-8 flex justify-center">
                    <AppRouter />
                </main>

                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
