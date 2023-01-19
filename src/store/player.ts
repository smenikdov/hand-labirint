import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

interface Player {
    coins: number,
    x: number,
    y: number,
}

interface Point {
    x: number,
    y: number,
}

const initialState: Player = {
    coins: parseInt(localStorage.getItem('coins') || '0'),
    x: 0,
    y: 0,
};

const slice = createSlice({
    name: 'player',
    initialState,

    reducers: {
        setCoins(player, action: PayloadAction<number>) {
            const newCoins = action.payload;
            localStorage.setItem('coins', newCoins.toString());
            player.coins = newCoins;
        },

        goTo(player, action: PayloadAction<Point>) {
            const { x, y } = action.payload;
            player.x = x;
            player.y = y;
        },
    }
});

export default slice.reducer;
const { setCoins, goTo, } = slice.actions;
export { setCoins, goTo, };
