import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { Point, Bullet, NewPlayerData, Enemy } from '../scripts/types';
interface Player {
    stars: number,
    coins: number,
    x: number,
    y: number,
    type: 'positive' | 'negative',
    godMode: boolean,
    bullets: Array<Bullet>,
    enemies: Array<Enemy>,
    angle: number,
    isFist: boolean,
    energy: number,
    weaponState: 'reloading' | 'ready' | 'prepare' | 'shoot',
}

const initialState: Player = {
    stars: parseInt(localStorage.getItem('stars') || '0'),
    coins: parseInt(localStorage.getItem('coins') || '0'),
    x: 50,
    y: 50,
    type: 'negative',
    godMode: false,
    bullets: [],
    enemies: [],
    angle: 0,
    isFist: false,
    energy: 0,
    weaponState: 'ready',
};

const slice = createSlice({
    name: 'player',
    initialState,

    reducers: {
        updateBullets(player, action: PayloadAction<Array<Bullet>>) {
            player.bullets = action.payload;
        },

        setWeaponState(player, action: PayloadAction<'reloading' | 'ready' | 'prepare' | 'shoot'>) {
            player.weaponState = action.payload;
        },

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
            player.x = x;
            player.y = y;
        },

        playerUpdate(player, action: PayloadAction<NewPlayerData>) {
            const { x, y, bullets, enemies, angle, isFist } = action.payload;
            player.x = x;
            player.y = y;
            player.bullets = bullets;
            player.enemies = enemies;
            player.angle = angle;
            player.isFist = isFist;
            if (isFist && player.energy < 100) {
                player.energy++;
            }
            if (!isFist && player.energy > 0) {
                player.energy--;
            }
        },

        killEnemy(player, action: PayloadAction<number>) {
            const enemyId = action.payload;
            player.enemies = player.enemies.map(en =>
                en.id === enemyId ? { ...en, status: 'dead' } : en
            );
        },

        deleteEnemy(player, action: PayloadAction<number>) {
            const enemyId = action.payload;
            player.enemies = player.enemies.filter(en => en.id !== enemyId);
        }
    }
});

export default slice.reducer;
const { setStars, setCoins, goTo, setType, addStar, addCoin, updateBullets, playerUpdate, setWeaponState, killEnemy, deleteEnemy, } = slice.actions;
export { setStars, setCoins, goTo, setType, addStar, addCoin, updateBullets, playerUpdate, setWeaponState, killEnemy, deleteEnemy, };
