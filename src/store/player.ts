import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

interface Player {
    stars: number,
    coins: number,
    x: number,
    y: number,
    prevX: number,
    prevY: number,
    type: 'positive' | 'negative',
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
    prevX: 50,
    prevY: 50,
    type: 'negative',
    charge: 3,
    maxCharge: 3,
    godMode: true,
};

const slice = createSlice({
    name: 'player',
    initialState,

    reducers: {
        setType(player, action: PayloadAction<'positive' | 'negative'>) {
            player.type = action.payload;
        },

        setStars(player, action: PayloadAction<number>) {
            const newStarsCount = action.payload;
            localStorage.setItem('stars', newStarsCount.toString());
            player.stars = newStarsCount;
        },

        addStar(player) {
            const newStarsCount = player.stars + 1;
            localStorage.setItem('stars', newStarsCount.toString());
            player.stars = newStarsCount;
        },

        addCoin(player) {
            const newCoinsCount = player.coins + 1;
            localStorage.setItem('coins', newCoinsCount.toString());
            player.stars = newCoinsCount;
        },

        setCoins(player, action: PayloadAction<number>) {
            const newCoinsCount = action.payload;
            localStorage.setItem('coins', newCoinsCount.toString());
            player.coins = newCoinsCount;
        },

        goTo(player, action: PayloadAction<Point>) {
            const { x, y } = action.payload;
            player.prevX = player.x;
            player.prevY = player.y;
            player.x = x;
            player.y = y;
        },
    }
});

export default slice.reducer;
const { setStars, setCoins, goTo, setType, addStar, addCoin, } = slice.actions;
export { setStars, setCoins, goTo, setType, addStar, addCoin, };
