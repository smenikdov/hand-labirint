import { Level } from '../scripts/types';

let levels: Level[] = []
let levelId: number = 0;

levels.push(new Level({
    lab: [
        '################',
        '#      0       #',
        '######~~~#######',
        '#              #',
        '#              #',
        '#           ★  #',
        '#              #',
        '#              #',
        '#              #',
        '#   ★          #',
        '#              #',
        '#          ★   #',
        '#              #',
        '#             1#',
        '#              #',
        '################',
    ],
    title: 'Ну поехали!',
    stopMode: true,
    chat: [
        {
            text: 'Советую не спешить',
        },
    ],
}));


levels.push(new Level({
    lab: [
        '################',
        '# 0  #         #',
        '#            ★ #',
        '#    #         #',
        '#   ######~~~~~#',
        '#              #',
        '#              #',
        '#      #       #',
        '#      #       #',
        '#   ★  ~       #',
        '#      ~       #',
        '########   ★   #',
        '#              #',
        '#             1#',
        '#              #',
        '################',
    ],
    title: 'Ну поехали!',
    stopMode: true,
    chat: [],
}));


export default levels;
