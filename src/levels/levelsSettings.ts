export const parseLab = {
    ' ': 'empty',
    '1': 'finish',
    '0': 'start',
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
