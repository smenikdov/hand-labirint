import { createSlice, createSelector } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { CellSymbol, Level } from '../scripts/types';
import planets from '../levels/planets';

interface CellInfo {
    symbol: CellSymbol,
    status?: 'active' | 'disable',
};

export const getLevel = (planetId: number, levelId: number): Level => {
    const planet = planets.find(pl => pl.id === planetId)!;
    const level = planet.levels.find(lvl => lvl.id === levelId)!;
    return level;
};

interface Game {
    planetId: number,
    levelInfo: Array<Array<CellInfo>>,
    levelId: number,
    isLevelComplete: boolean,
};

interface PayloadChangeCellState {
    xIndex: number,
    yIndex: number,
    status: 'active' | 'disable',
};

const initialState: Game = {
    planetId: 0,
    levelId: 4,
    levelInfo: [],
    isLevelComplete: false,
};

const slice = createSlice({
    name: 'game',
    initialState,

    reducers: {
        setLevel(game, action: PayloadAction<number>) {
            const levelId = action.payload;
            const level = getLevel(game.planetId, levelId);
            game.levelId = levelId;
            game.levelInfo = [];
            game.isLevelComplete = false;
            level.forEachCell((symbol, xIndex, yIndex) => {
                const cellInfo: CellInfo = {
                    symbol
                };

                if (symbol === '★') {
                    cellInfo.status = 'active';
                }

                if (!game.levelInfo[xIndex]) {
                    game.levelInfo[xIndex] = [];
                }
                game.levelInfo[xIndex][yIndex] = cellInfo;
            });
        },

        endLevel(game) {
            game.isLevelComplete = true;
        },

        setPlanet(game, action: PayloadAction<number>) {
            const planetId = action.payload;
            game.planetId = planetId;
        },

        changeCellInfo(game, action: PayloadAction<PayloadChangeCellState>) {
            const { xIndex, yIndex, status } = action.payload;
            game.levelInfo[xIndex][yIndex].status = status;
        },

        // resetMapInfo(game) {
        //     game.levelInfo.forEach(cellInfo => cellInfo.status ? cellInfo.status = 'active' : 0);
        // },
    }
});

export default slice.reducer;
const { setLevel, setPlanet, changeCellInfo, endLevel, } = slice.actions;
export { setLevel, setPlanet, changeCellInfo, endLevel, };
