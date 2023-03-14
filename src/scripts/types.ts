export interface Point {
    x: number,
    y: number,
};

export type BlockType = 'negative' | 'positive';

export const parseLab = {
    ' ': 'empty',
    '1': 'finish',
    '0': 'start', // Пока что может находиться только на верхней линии
    '★': 'star neutral',
    '┏': 'wall leftTopAngle',
    '┓': 'wall rightTopAngle',
    '┗': 'wall leftBottomAngle',
    '┛': 'wall rightBottomAngle',
    '-': 'wall horizontal',
    '|': 'wall vertical',
    '#': 'wall',
    '~': 'empty spaceshipCell',
};

export type CellSymbol = ' ' | '1' | '0' | '┏' | '┓' | '┗' | '┛' | '-' | '|' | '★' | '#' | '~';

export type Character = 'megabot' | 'spaceship' | 'seller';

export type Message = {
    text: string,
    showTime?: number,
    character?: Character,
};

export interface LevelParams {
    lab: Array<string>,
    title: string,
    chat?: Array<Message>,
    darkMode?: boolean,
    doubleMode?: boolean,
    stopMode?: boolean,
    enemyMode?: boolean,
};


export class Level {
    private static lastId = 0;
    public readonly id: number;
    public readonly lab: Array<string>;
    public readonly title: string;
    public readonly chat: Array<Message>;
    public readonly darkMode: boolean;
    public readonly doubleMode: boolean;
    public readonly stopMode: boolean;
    public readonly enemyMode: boolean;

    constructor({
        lab,
        title,
        chat = [],
        darkMode = false,
        doubleMode = false,
        stopMode = false,
        enemyMode = false,
    }: LevelParams) {
        Level.lastId++;
        this.id = Level.lastId;
        this.lab = lab;
        this.title = title;
        this.chat = chat;
        this.darkMode = darkMode;
        this.doubleMode = doubleMode;
        this.stopMode = stopMode;
        this.enemyMode = enemyMode;
    }

    forEachCell(callback: (symbol: CellSymbol, x: number, y: number) => void) {
        for (let y = 0; y < this.lab.length; y++) {
            for (let x = 0; x < this.lab[y].length; x++) {
                callback(this.lab[y][x] as CellSymbol, x, y);
            }
        }
    }

};

export type Planet = {
    id: number,
    name: string,
    cost: number,
    isOpen: boolean,
    levels: Array<Level>,
    description?: string,
    size?: string,
    className: string,
};

export type Landmarks = Point[];

export interface Block extends Point {
    size: number,
    format: 'circle' | 'square',
};

export interface Bullet extends Point {
    angle: number,
    type: BlockType,
    id: number,
};

export interface FingersData extends Point {
    lastFingersCounts: Array<number>,
    lastAngles: Array<number>,
};

export interface NewPlayerData extends Point {
    bullets: Array<Bullet>,
    enemies: Array<Enemy>,
    isFist: boolean,
    angle: number,
};

export interface Enemy extends Point {
    id: number,
    targetNumber: 1 | 2 | 3 | 4 | 5,
    status: 'dead' | 'alive',
};

export interface PointWithType extends Point {
    type: 'negative' | 'positive',
};