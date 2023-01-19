import { createSlice } from '@reduxjs/toolkit';

interface MyTimer {
    startTime: number,
    flag: NodeJS.Timer | null,
    time: string,
}

const initialState: MyTimer = {
    startTime: 0,
    flag: null,
    time: '00 : 00',
};

const slice = createSlice({
    name: 'timer',
    initialState,

    reducers: {
        startTimer(timer): void {
            function timeIncrement() {
                console.log(timer)
                let interval = new Date().getTime() - timer.startTime;
                let s = Math.floor(interval % 60000 / 1000);
                let m = Math.floor(interval % 3600000 / 60000);
                timer.time = `${m < 10 ? '0' + m : m} : ${s < 10 ? '0' + s : s}`;
            }

            timer.startTime = new Date().getTime();
            timer.flag = setInterval(timeIncrement, 1000);
            console.log(timer)
        },

        stopTimer(timer): void {
            if (timer.flag !== null) {
                clearInterval(timer.flag);
            }
        },
    },
});

export default slice.reducer;
const { startTimer, stopTimer } = slice.actions;
export { startTimer, stopTimer };