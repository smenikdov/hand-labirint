import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Level from './components/Level/Level';
import LevelMenu from './components/Level/LevelMenu';
import Shop from './components/Shop/Shop';
import Bar from './components/Bar';
import startMainLoop from './scripts/mainLoop';
import { Provider } from 'react-redux';
import store from './store/';
import './styles/main.css';
import Player from './components/Player';

function App() {
  useEffect(() => {
    startMainLoop();
  }, []);

  return (
    <main>
      <Bar />
      <Level />
      <LevelMenu />
      <Shop />
      <Player />
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

