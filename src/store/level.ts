import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

interface Level {
    isStartPlay: boolean,
    planetId: number,
    levelId: number,
}

const initialState: Level = {
    isStartPlay: false,
    planetId: 0,
    levelId: 0,
};

const slice = createSlice({
    name: 'level',
    initialState,

    reducers: {
        setLevel(level, action: PayloadAction<number>) {
            const levelId = action.payload;
            level.levelId = levelId;
        },

        setPlanet(level, action: PayloadAction<number>) {
            const planetId = action.payload;
            level.planetId = planetId;
        },

        nextLevel(level) {
            level.levelId += 1;
        },

        startPlay(level) {
            level.isStartPlay = true;
        },

        endPlay(level) {
            level.isStartPlay = false;
            // dispatch(startTimer);
        },
    }
});

export default slice.reducer;
const { setLevel, nextLevel, startPlay, endPlay, setPlanet } = slice.actions;
export { setLevel, nextLevel, startPlay, endPlay, setPlanet };
