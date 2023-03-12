import { Level } from '../scripts/types';

let levels: Level[] = []

levels.push(new Level({
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
    title: 'Ну поехали!',
    darkMode: true,
    chat: [
        {
            text: 'Темнота друг молодежи',
        },
    ],
}));

levels.push(new Level({
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
    title: 'Ну поехали!',
    darkMode: true,
    chat: [],
}));
export default levels;
