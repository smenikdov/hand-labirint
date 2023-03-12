import { Point, Landmarks, Bullet, CellSymbol, Block, Enemy } from '../scripts/types';

export const isVerticalRevert = (landmarks: Landmarks) => landmarks[9].y > landmarks[0].y;
export const isHorizontalRevert = (landmarks: Landmarks) => landmarks[17].x > landmarks[5].x;

export const calcFingersCount = (landmarks: Landmarks): number => {
    const fingerIndexes: Array<Array<number>> = [[8, 6], [12, 10], [16, 14], [20, 18]];

    let fingersCount = 0;

    for (const fingerIndex of fingerIndexes) {
        if (!isVerticalRevert(landmarks) && landmarks[fingerIndex[0]].y > landmarks[fingerIndex[1]].y) {
            fingersCount += 1
        }
        // else if (isVerticalRevert(landmarks) && landmarks[fingerIndex[0]].y < landmarks[fingerIndex[1]].y) {
        //     fingersCount += 1
        // }
    }

    return fingersCount
};

export const calcAngle = (point1: Point, point2: Point): number => {
    const xDiff = point1.x - point2.x;
    const yDiff = point1.y - point2.y;
    const angleInRadians = Math.atan2(yDiff, xDiff);
    return angleInRadians
};


export const calcResultPoint = (landmarks: Landmarks): Point => {
    let x = 0;
    let y = 0;
    for (let i = 5; i < 21; i++) {
        x += landmarks[i].x;
        y += landmarks[i].y;
    }
    x /= 16;
    y /= 16;
    let width = window.innerWidth;
    let height = window.innerHeight;
    x = width - x * width;
    y = y * height;
    return {
        x,
        y,
    }
};


export const isAllLandmarks = (landmarks: Landmarks): boolean => {
    for (let i = 5; i < 21; i++) {
        if (!landmarks[i].x || !landmarks[i].y) {
            return false
        }
    }
    return true;
};

export const calcAverage = (array: Array<number>): number => {
    return array.reduce((sum, val) => sum + val, 0) / array.length;
};

export const calcAverageAngle = (angles: Array<number>): number => {
    let xSum = 0;
    let ySum = 0;
    for (const angle of angles) {
        xSum += Math.cos(angle);
        ySum += Math.sin(angle);
    }

    const meanAngleRad = Math.atan2(ySum / angles.length, xSum / angles.length);
    return meanAngleRad < 0 ? meanAngleRad + 2 * Math.PI : meanAngleRad;
};

export const shiftBullets = (bullets: Array<Bullet>): Array<Bullet> => {
    const BULLET_SPEED = 20;
    const newBullets = bullets.map(({ x, y, angle, type, id }) => {
        return {
            x: x + BULLET_SPEED * Math.cos(angle),
            y: y + BULLET_SPEED * Math.sin(angle),
            angle,
            type,
            id,
        }
    });

    return newBullets.filter(({ x, y }) => {
        return x >= -100 && x <= window.innerWidth + 1000 && y >= -100 && y <= window.innerHeight + 100;
    });
};

export const shiftEnemies = (enemies: Array<Enemy>, player: Point): Array<Enemy> => {
    const ENEMY_SPEED = 3;
    const newEnemies = enemies.map(({ x, y, id, targetNumber }) => {
        const angle = calcAngle({ x, y }, player);
        return {
            x: x - ENEMY_SPEED * Math.cos(angle),
            y: y - ENEMY_SPEED * Math.sin(angle),
            id,
            targetNumber,
        }
    });

    return newEnemies
}

export const isWall = (cell: CellSymbol): boolean => {
    if (['┏', '┓', '┗', '┛', '-', '|', '#'].includes(cell)) {
        return true
    } else {
        return false
    }
};

export const checkBlocksCrossing = (
    { x: x1, y: y1, size: size1 }: Block,
    { x: x2, y: y2, size: size2 }: Block
): boolean => {
    let block1Left = x1;
    let block1Right = x1 + size1;
    let block1Top = y1;
    let block1Bottom = y1 + size1;

    let block2Left = x2;
    let block2Right = x2 + size2;
    let block2Top = y2;
    let block2Bottom = y2 + size2;

    const k1 = (block1Left <= block2Right) && (block1Right >= block2Left);
    const k2 = (block1Top <= block2Bottom) && (block1Bottom >= block2Top);

    return k1 && k2
};

export const rand = (start: number, end: number): number => Math.random() * (end - start + 1) + start;