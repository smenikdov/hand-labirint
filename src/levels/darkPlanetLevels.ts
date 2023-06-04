import { Level } from '../scripts/types';

let levels: Level[] = [];

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
    title: 'Ночь.',
    darkMode: true,
    chat: [
        {
            set: 'scary',
            text: 'Добро пожаловать на планету страха, где темнота царит над всем.',
        },
        {
            text: 'Я сама пропитана страхом, и зову тебя, потерянная звезда, чтобы разделить его со мной.',
        },
        {
            text: 'О, сколько страхов таится во мне, и я стараюсь погрузить в них всех, кто попадает на мою поверхность.',
        },
        {
            text: 'Посмотри вокруг, потерянная звезда. Видишь этих жителей, которые, подобно мне, боятся всего и вся?',
        },
        {
            text: 'Я переполена лживыми царьками, бесконечными болезнями, и медленно удушающим одиночеством.',
        },
        {
            text: 'Ничтожная здвездочка, полугорящий огонек, одну тебя я не боюсь в этой темноте.',
        },
        {
            text: 'Только солнце, крепко сжимая свой кулак света, способно рассеять мою тьму.',
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
    title: 'Смелость.',
    darkMode: true,
}));

levels.push(new Level({
    lab: [
        '################',
        '#              #',
        '#   0          #',
        '#  #########   #',
        '#  #   ★   #   #',
        '#  ###   ###   #',
        '#              #',
        '# ############ #',
        '#   ★#         #',
        '########  ######',
        '#      #  ###  #',
        '#  ★           #',
        '# #######      #',
        '#      1#      #',
        '#              #',
        '################',
    ],
    title: 'Город.',
    darkMode: true,
    chat: [
        {
            set: 'scary',
            text: 'Беги от меня, ничтожный огонек. Взгляни на моё небо, на нем нет облаков. И звезд.',
        },
        {
            text: 'Ты оказалась действительно смела. Позволь мне рассказать тебе историю, как эта планета стала планетой страха.',
        },
        {
            text: 'Этот страх начал проникать сквозь умы моих жителей, подобно тонким трещинам в мраморной скульптуре.',
        },
        {
            text: 'Словно под землей, внутри каждого из них, страх превращался в корни, захватывающие их судьбы.',
        },
        {
            text: 'Он питался их сомнениями и внутренними конфликтами, путая их разум и гася яркость их сущности.',
        },
        {
            text: 'Несказанным словом, маленькой уступкой, безобидным обманом, я затмил яркость их мечтаний и забрал у них радость открытий.',
        },
    ],
}));


levels.push(new Level({
    lab: [
        '################',
        '#              #',
        '#   0  #       #',
        '#      ### ★ ###',
        '####   #       #',
        '#      #       #',
        '#    #######   #',
        '#              #',
        '####  # ★ ######',
        '#     #        #',
        '#     #   #    #',
        '#   ###   #    #',
        '#     #   #  ★ #',
        '####      #    #',
        '# 1   #        #',
        '################',
    ],
    title: 'Крошки.',
    darkMode: true,
    chat: [],
}));

levels.push(new Level({
    lab: [
        '################',
        '#0             #',
        '#  #########   #',
        '#  #         # #',
        '#  #   ####### #',
        '#  #   #   #   #',
        '#  #   #   #####',
        '#  #   #   #  1#',
        '#  #     ★ #   #',
        '#  #   #   #   #',
        '#  #   #####   #',
        '#  #   #   #   #',
        '#★ #   # ★ #   #',
        '#  #   #       #',
        '#  #       #   #',
        '#  #   #   #   #',
        '################'
    ],
    title: 'Тупик.',
    darkMode: true,
    chat: [],
}));

levels.push(new Level({
    lab: [
        '################',
        '#0       #   ★ #',
        '# ### #### ### #',
        '# #   #    #   #',
        '# # # #### ### #',
        '#   #      #   #',
        '##### #### #####',
        '#   #   #      #',
        '# ### ##### ####',
        '#   #  1       #',
        '### ######  ####',
        '# ★   #        #',
        '###### ##    # #',
        '#         ★    #',
        '# #######    ###',
        '#              #',
        '################'
    ],
    title: 'Лабиринт.',
    darkMode: true,
    chat: [],
}));

levels.push(new Level({
    lab: [
        '################',
        '#0    #  ★★★  ##',
        '# ### ## ####  # ',
        '#   # #     #  #',
        '## # ### ## # ## ',
        '#     #   #    #',
        '## #  ###### ###',
        '# #   #    #   #',
        '# ###  ####  ###',
        '#       #   #  #',
        '## ##### ###  ##',
        '#   #   #      #',
        '### ### #####  #',
        '#1  #     #    #',
        '### #########  #',
        '#              #',
        '################'
    ],
    title: 'Потерянные.',
    darkMode: true,
    chat: [
        {   
            set: 'scary',
            text: 'Ах, потерянная звезда, я видела, как ты преодолевала свои страхи и светила в самых мрачных уголках этой планеты.',
        },
        {
            text: 'Что тебе нужно от меня? У меня нет ни смелости, ни света?',
        },
        {
            text: 'Если ищешь ты знаний о смелости и силе духа, отправляйся на планету гнева.',
        },
        {
            text: 'Там ты найдешь то, что тебе нужно, а ко мне не возвращайся, тебе тут не место.',
        },
    ],
}));


export default levels;
