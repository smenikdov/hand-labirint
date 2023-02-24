import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MyTimer {
    time: string,
}

const initialState: MyTimer = {
    time: '00 : 00',
};

const slice = createSlice({
    name: 'timer',
    initialState,

    reducers: {
        setTime(timer, action: PayloadAction<string>) {
            timer.time = action.payload;
        }
    },
});

export default slice.reducer;
const { setTime } = slice.actions;
export { setTime };