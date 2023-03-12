import { configureStore, combineReducers, getDefaultMiddleware, createSelector } from '@reduxjs/toolkit';
import playerReducer from './player';
import timerReducer from './timer';
import gameReducer from './game';
import chatReducer from './chat';
import planets from '../levels/planets';
import { Level } from '../scripts/types';

const getLevel = (planetId: number, levelId: number): Level => {
    const planet = planets.find(pl => pl.id === planetId)!;
    const level = planet.levels.find(lvl => lvl.id === levelId)!;
    return level;
};

const rootReducer = combineReducers({
    player: playerReducer,
    timer: timerReducer,
    game: gameReducer,
    chat: chatReducer,
});

export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
    reducer: rootReducer,
    middleware: [
        ...getDefaultMiddleware(),
    ]
});

export default store;


export const selectLevel = createSelector(
    (state: RootState) => state.game.planetId,
    (state: RootState) => state.game.levelId,
    getLevel
);

