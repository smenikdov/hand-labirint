import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import planets from '../levels/planets';

interface Level {
    planetId: number,
    levelId: number,
}

const initialState: Level = {
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
    }
});

export default slice.reducer;
const { setLevel, nextLevel, setPlanet } = slice.actions;
export { setLevel, nextLevel, setPlanet };
