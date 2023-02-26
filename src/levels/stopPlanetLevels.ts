import { Level } from './levelsSettings';

let levels: Level[] = []
let levelId: number = 0;

levels.push({
    lab: [
        '#---------#----#',
        '|0        |    |',
        '|         |  ★ |',
        '|         |    |',
        '|         |    |',
        '#-~~~-----#    |',
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
    id: levelId++,
    title: 'Ну поехали!',
    stopMode: true,
    chat: [],
});

export default levels;
