export const parseLab = {
    ' ': 'empty',
    '1': 'finish',
    '0': 'start', // Пока что может находиться только на верхней линии
    '★': 'star neutral',
    '┏': 'wall LeftTopAngle',
    '┓': 'wall rightTopAngle',
    '┗': 'wall leftBottomAngle',
    '┛': 'wall rightBottomAngle',
    '-': 'wall horizontal',
    '|': 'wall vertical',
    '#': 'wall',
};

export type CellSymbol = ' ' | '1' | '0' | '┏' | '┓' | '┗' | '┛' | '-' | '|' | '★' | '#';

export type Message = {
    text: string,
    // TOOD
    // character
}

export type Level = {
    lab: String[],
    id: number,
    title: string,
    chat?: Message[],
    darkMode?: boolean,
    doubleMode?: boolean,
    stopMode?: boolean,
}

export type Planet = {
    id: number,
    name: string,
    cost?: number,
    isOpen: boolean,
    levels: Level[],
    description?: string,
    size?: string,
    className: string,
}


export const isWall = (cell: CellSymbol): boolean => {
    if (['┏', '┓', '┗', '┛', '-', '|', '#'].includes(cell)) {
        return true
    } else {
        return false
    }
}