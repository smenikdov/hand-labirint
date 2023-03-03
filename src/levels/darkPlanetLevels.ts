import { Level } from './levelsSettings';

let levels: Level[] = []
let levelId: number = 0;

levels.push({
    lab: [
        '################',
        '# 0  #    #    #',
        '#    # ★       #',
        '#    #    #    #',
        '#    ######    #',
        '#              #',
        '#          #####',
        '#      #       #',
        '#      #    ★  #',
        '#      #########',
        '#              #',
        '#######  #######',
        '#         #    #',
        '# ★           1#',
        '#         #    #',
        '################',
    ],
    id: levelId++,
    title: 'Ну поехали!',
    darkMode: true,
    chat: [
        {
            text: 'Темнота друг молодежи',
        },
    ],
});

levels.push({
    lab: [
        '################',
        '# 0            #',
        '#            ★ #',
        '############   #',
        '#              #',
        '####   ####   ##',
        '#        #     #',
        '#    #    #######',
        '#    #  ★      #',
        '######         #',
        '#       #####  #',
        '#        #     #',
        '#        #     #',
        '# ★      #    1#',
        '#              #',
        '################',
    ],
    id: levelId++,
    title: 'Ну поехали!',
    darkMode: true,
    chat: [],
});
export default levels;
