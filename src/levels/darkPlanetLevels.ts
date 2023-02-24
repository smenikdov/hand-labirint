import { Level } from './levelsSettings';

let levels: Level[] = []
let levelId: number = 0;

levels.push({
    lab: [
        '#---------#----#',
        '|0             |',
        '|            ★ |',
        '|              |',
        '|              |',
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
    id: levelId++,
    title: 'Ну поехали!',
    chat: [
        {
            text: 'Что? Кто ты такой?... Как ты здесь оказлся?',
        },
        {
            text: 'Постой ка... Ты же тот великий волшебник, о котором все говорят',
        },
        {
            text: 'Посотрим как ты справишься с этой задачей',
        },
        {
            text: 'Волшебник, мать его....',
        }
    ],
});

export default levels;
