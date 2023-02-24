import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Level from './components/Level/Level';
import CameraInterface from './components/CameraInterface';
import MyParticles from './components/MyParticles';
import startMainLoop from './scripts/mainLoop';
import { Provider } from 'react-redux';
import store from './store/';
import Player from './components/Player';
import Chat from './components/Chat';
import Menu from './components/Menu';
import './styles/main.scss';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';


function App() {
    useEffect(() => {
        startMainLoop();
    }, []);



    return (
        <main>
            <BrowserRouter>
                <MyParticles />
                <div id="eclipseBlock" />

                <Routes>
                    <Route path="/" element={<Menu />} />
                </Routes>
                <Routes>
                    <Route path="/game" element={<Level />} />
                </Routes>

                <CameraInterface />
                <Chat />
                {/* <Player /> */}
            </BrowserRouter>
        </main>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>,
    </React.StrictMode>,
    document.getElementById('app')
);

