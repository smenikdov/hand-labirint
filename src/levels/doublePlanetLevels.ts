import { Level } from '../scripts/types';

let levels: Level[] = [];

levels.push(new Level({
    lab: [
        '#---------#----#',
        '|0        |    |',
        '|         |  ★ |',
        '|         |    |',
        '|         |    |',
        '|     ----#    |',
        '|              |',
        '|              |',
        '|          ----#',
        '|              |',
        '|              |',
        '#-----         |',
        '|              |',
        '| ★           1|',
        '|              |',
        '#--------------#',
    ],
    title: 'Ну поехали!',
    doubleMode: true,
}));

export default levels;
