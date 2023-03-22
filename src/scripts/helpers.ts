import { Point, Landmarks, Bullet, CellSymbol, Block, Enemy, PointWithType } from '../scripts/types';

export const isVerticalRevert = (landmarks: Landmarks) => landmarks[9].y > landmarks[0].y;
export const isHorizontalRevert = (landmarks: Landmarks) => landmarks[17].x > landmarks[5].x;
export const deepCopy = (val: any): any => JSON.parse(JSON.stringify(val));

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
    let width = window.innerWidth * 1.2;
    let height = window.innerHeight * 1.2;
    x = width - x * width - width * 0.1;
    y = y * height - height * 0.1;
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
    const BULLET_SPEED = 55;
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
        return x >= -100 && x <= window.innerWidth + 100 && y >= -100 && y <= window.innerHeight + 100;
    });
};

export const shiftEnemies = (enemies: Array<Enemy>, player: PointWithType): Array<Enemy> => {
    const ENEMY_SPEED = player.type === 'negative' ? 3 : 15;


    const newEnemies = enemies.map((enemy) => {
        const newEnemy = deepCopy(enemy);
        if (newEnemy.status === 'alive') {
            const angle = calcAngle(newEnemy, player);
            newEnemy.x += ENEMY_SPEED * Math.cos(angle) * (player.type === 'negative' ? -1 : 1);
            newEnemy.y += ENEMY_SPEED * Math.sin(angle) * (player.type === 'negative' ? -1 : 1);
        };
        return newEnemy;
    });

    if (player.type === 'positive') {
        return newEnemies.filter(({ x, y }) => {
            return x >= -100 && x <= window.innerWidth + 100 && y >= -100 && y <= window.innerHeight + 100;
        });
    } else {
        return newEnemies
    }
};

export const isWall = (cell: CellSymbol): boolean => {
    if (['┏', '┓', '┗', '┛', '-', '|', '#'].includes(cell)) {
        return true
    } else {
        return false
    }
};

export const checkBlocksCrossing = (
    { x: x1, y: y1, size: size1, format: format1, }: Block,
    { x: x2, y: y2, size: size2, format: format2, }: Block
): boolean => {

    if (format1 === 'square' || format2 === 'square') {
        const block1Left = x1;
        const block1Right = x1 + size1;
        const block1Top = y1;
        const block1Bottom = y1 + size1;

        const block2Left = x2;
        const block2Right = x2 + size2;
        const block2Top = y2;
        const block2Bottom = y2 + size2;

        const k1 = (block1Left <= block2Right) && (block1Right >= block2Left);
        const k2 = (block1Top <= block2Bottom) && (block1Bottom >= block2Top);

        return k1 && k2
    } else {
        const distanceX = x1 - x2;
        const distanceY = y1 - y2;
        const radiusSum = size1 / 2 + size2 / 2;
        return Math.sqrt(distanceX * distanceX + distanceY * distanceY) <= radiusSum;
    }
};

export const rand = (start: number, end: number): number => Math.random() * (end - start + 1) + start;