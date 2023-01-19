import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import playerReducer from './player';
import timerReducer from './timer';
import levelReducer from './level';

const rootReducer = combineReducers({
    player: playerReducer,
    timer: timerReducer,
    level: levelReducer,
});

export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
    reducer: rootReducer,
    middleware: [
        ...getDefaultMiddleware(),
    ]
});

export default store;

