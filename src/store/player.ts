import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

interface Player {
    stars: number,
    coins: number,
    x: number,
    y: number,
    charge: number,
    maxCharge: number,
    godMode: boolean,
}

interface Point {
    x: number,
    y: number,
}

const initialState: Player = {
    stars: parseInt(localStorage.getItem('stars') || '0'),
    coins: parseInt(localStorage.getItem('coins') || '0'),
    x: 50,
    y: 50,
    charge: 3,
    maxCharge: 3,
    godMode: true,
};

const slice = createSlice({
    name: 'player',
    initialState,

    reducers: {
        setStars(player, action: PayloadAction<number>) {
            const newStarsCount = action.payload;
            localStorage.setItem('stars', newStarsCount.toString());
            player.stars = newStarsCount;
        },

        setCoins(player, action: PayloadAction<number>) {
            const newCoinsCount = action.payload;
            localStorage.setItem('coins', newCoinsCount.toString());
            player.coins = newCoinsCount;
        },

        goTo(player, action: PayloadAction<Point>) {
            const { x, y } = action.payload;
            player.x = x;
            player.y = y;
        },
    }
});

export default slice.reducer;
const { setStars, setCoins, goTo, } = slice.actions;
export { setStars, setCoins, goTo, };
