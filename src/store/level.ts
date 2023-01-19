import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

interface Level {
    isStartPlay: boolean,
    id: number,
}

const initialState: Level = {
    isStartPlay: false,
    id: 0,
};

const slice = createSlice({
    name: 'level',
    initialState,

    reducers: {
        setLevel(level, action: PayloadAction<number>) {
            const levelId = action.payload;
            level.id = levelId;
        },

        nextLevel(level) {
            level.id += 1;
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
const { setLevel, nextLevel, startPlay, endPlay } = slice.actions;
export { setLevel, nextLevel, startPlay, endPlay };
