const {
    merchant,
    engineer,
    workbench,
    madman,
    hexagon,
    siencelab
} = require('./../places.js');

const {
    CAPS,
    MATERIALS,
    GENERATORS,
    MICROCHIPS,
    IRIDIUM,
    WIRES,
    MINICHARGE,
    TOPAZ,
    DUSTER,
    WOLFRAM,
    FOIL,
    TAPE,
    THROGHEART,
    POTENTIOMETER,
    STEEL,
    PLASMA,
    BIOS,
    MAGNET,
    PLANTAIN,
    STARCH,
    AIRFILTER,
    EPHEDRINE,
    getResource,
    FIRST,
    SECOND,
    getRarityIcon
} = require('./resources.js');

const armorsLongComment = '🛡 Защита: +';
const armorsShortComment = '🛡';

const armors = [
    {
        icon: false,
        title: "Плотная куртка",
        price: [getResource(CAPS, 30)],
        characteristic: 1,
        place: merchant
    },
    {
        icon: false,
        title: "Комбинезон убежища",
        price: [getResource(CAPS, 30)],
        characteristic: 3,
        place: merchant
    },
    {
        icon: false,
        title: "Кожанный нагрудник",
        price: [getResource(CAPS, 30)],
        characteristic: 6,
        place: merchant
    },
    {
        icon: false,
        title: "Мото-защита",
        price: [getResource(CAPS, 30)],
        characteristic: 9,
        place: merchant
    },
    {
        icon: false,
        title: "Легкий кевлар",
        price: [getResource(CAPS, 30)],
        characteristic: 10,
        place: merchant
    },
    {
        icon: false,
        title: "Крепкий кевлар",
        price: [getResource(CAPS, 30)],
        characteristic: 10,
        place: merchant
    },
    {
        icon: false,
        title: "Броня братства",
        price: [getResource(CAPS, 30)],
        characteristic: 15,
        place: merchant
    },
    {
        icon: false,
        title: "Боевая броня",
        price: [getResource(CAPS, 680)],
        characteristic: 25,
        place: merchant
    },
    {
        icon: false,
        title: "Броня Когтей",
        price: [getResource(CAPS, 1580)],
        characteristic: 32,
        place: merchant
    },
    {
        icon: "👕",
        title: "Портупея",
        price: [getResource(MATERIALS, 390)],
        characteristic: 3,
        place: workbench
    },
    {
        icon: "👕",
        title: "Кожаный жилет",
        price: [getResource(MATERIALS, 890)],
        characteristic: 6,
        place: workbench
    },
    {
        icon: "👕",
        title: "Титановые щитки",
        price: [getResource(MATERIALS, 5200)],
        characteristic: 16,
        place: workbench
    },
    {
        icon: "⚙️",
        title: "Силовая броня",
        price: [getResource(MATERIALS, 12990), getResource(GENERATORS, 5)],
        characteristic: 25,
        place: workbench
    },
    {
        icon: "⚙️",
        title: "Силовая броня🎖",
        price: [getResource(MATERIALS, 22990), getResource(GENERATORS, 15)],
        characteristic: 35,
        place: workbench
    },
    {
        icon: "⚙️",
        title: "Силовая броня🎖🎖",
        price: [getResource(MATERIALS, 35990), getResource(GENERATORS, 35)],
        characteristic: 45,
        place: workbench
    },
    {
        icon: "⚙️",
        title: "Броня 'Тесла'",
        price: [getResource(MATERIALS, 40990), getResource(GENERATORS, 40), 
            getResource(MICROCHIPS, 10)],
        characteristic: 55,
        place: workbench
    },
    {
        icon: "⚙️",
        title: "Броня 'Геенна'",
        price: [getResource(MATERIALS, 52990), getResource(GENERATORS, 80), 
            getResource(MICROCHIPS, 21)],
        characteristic: 66,
        place: workbench,
        rarities: [FIRST, SECOND]
    },
    {
        icon: "⚙️",
        title: "Броня 'Геенна'",
        price: [getResource(WOLFRAM, 9), getResource(DUSTER, 12)],
        characteristic: 87,
        place: workbench,
        rarity: getRarityIcon(FIRST)
    },
    {
        icon: "⚙️",
        title: "Броня 'Геенна'",
        price: [getResource(WOLFRAM, 19), getResource(DUSTER, 22)],
        characteristic: 96,
        place: workbench,
        rarity: getRarityIcon(SECOND)
    },
    {
        icon: "🦇",
        title: "Бэткостюм",
        price: [getResource(MATERIALS, 72900), getResource(GENERATORS, 120), 
            getResource(MICROCHIPS, 54), getResource(IRIDIUM, 25)],
        characteristic: 76,
        place: engineer,
        rarities: [FIRST, SECOND]
    },
    {
        icon: "🦇",
        title: "Бэткостюм",
        price: [getResource(FOIL, 3), getResource(WIRES, 15), getResource(TAPE, 12)],
        characteristic: 95,
        place: engineer,
        rarity: getRarityIcon(FIRST)
    },
    {
        icon: "⚛️",
        title: "Нановолокно",
        price: [getResource(MATERIALS, 98000), getResource(GENERATORS, 150), 
            getResource(MICROCHIPS, 85), getResource(IRIDIUM, 46)],
        characteristic: 89,
        place: engineer,
        rarities: [FIRST, SECOND]
    },
    {
        icon: "⚛️",
        title: "Нановолокно",
        price: [getResource(FOIL, 3), getResource(WOLFRAM, 13),
            getResource(TAPE, 12), getResource(WIRES, 16)],
        characteristic: 113,
        place: engineer,
        rarity: getRarityIcon(FIRST)
    },
    {
        icon: "🛠",
        title: "Мультизащита",
        price: [getResource(MATERIALS, 141900), getResource(GENERATORS, 190), 
            getResource(MICROCHIPS, 125), getResource(IRIDIUM, 69)],
        characteristic: 127,
        place: engineer,
        rarities: [FIRST, SECOND]
    },
    {
        icon: "🛠",
        title: "Мультизащита",
        price: [getResource(FOIL, 12), getResource(PLASMA, 14),
            getResource(THROGHEART, 11), getResource(POTENTIOMETER, 23), getResource(STEEL, 24)],
        characteristic: 157,
        place: engineer,
        rarity: getRarityIcon(FIRST)
    },
    {
        icon: "🛠",
        title: "Мультизащита",
        price: [getResource(FOIL, 32), getResource(PLASMA, 29),
            getResource(THROGHEART, 21), getResource(POTENTIOMETER, 33), getResource(STEEL, 39)],
        characteristic: false,
        place: engineer,
        rarity: getRarityIcon(SECOND)
    },
    {
        icon: "⚡️",
        title: "Тесла-мех",
        price: [getResource(MATERIALS, 179990), getResource(GENERATORS, 210),
            getResource(MICROCHIPS, 145), getResource(IRIDIUM, 116)],
        characteristic: 161,
        place: engineer,
        rarities: [FIRST, SECOND]
    },
    {
        icon: "⚡️",
        title: "Тесла-мех",
        price: [getResource(MINICHARGE, 31), getResource(BIOS, 4),
            getResource(MAGNET, 5), getResource(PLANTAIN, 16)],
        characteristic: 187,
        place: { engineer, siencelab },
        rarity: getRarityIcon(FIRST)
    },
    {
        icon: "⚡️",
        title: "Тесла-мех",
        price: [getResource(MINICHARGE, 46), getResource(BIOS, 15),
            getResource(MAGNET, 35), getResource(PLANTAIN, 36)],
        characteristic: 198,
        place: engineer,
        rarity: getRarityIcon(SECOND)
    },
    {
        icon: false,
        title: 'Броня Безумца',
        price: [getResource(WIRES, 17), getResource(PLASMA, 7), getResource(TAPE, 9)],
        characteristic: 58,
        place: madman,
        rarities: [FIRST, SECOND]
    },
    {
        icon: false,
        title: 'Броня Безумца',
        price: [getResource(FOIL, 2), getResource(THROGHEART, 11),
            getResource(POTENTIOMETER, 3), getResource(STEEL, 4)],
        characteristic: 58,
        place: madman,
        rarity: getRarityIcon(FIRST)
    },
    {
        icon: false,
        title: 'Броня Безумца',
        price: [getResource(FOIL, 12), getResource(THROGHEART, 21),
            getResource(POTENTIOMETER, 13), getResource(STEEL, 14)],
        characteristic: false,
        place: madman,
        rarity: getRarityIcon(SECOND)
    },
    {
        icon: '⚛️',
        title: 'Экзокостюм',
        price: [getResource(STARCH, 6), getResource(AIRFILTER, 5), getResource(EPHEDRINE, 15)],
        characteristic: 68,
        place: madman,
        rarities: [FIRST, SECOND]
    },
    {
        icon: '⚛️',
        title: 'Экзокостюм',
        price: [getResource(MINICHARGE, 4), getResource(TAPE, 6), getResource(TOPAZ, 5)],
        characteristic: 89,
        place: madman,
        rarity: getRarityIcon(FIRST)
    },
    {
        icon: '⚛️',
        title: 'Экзокостюм',
        price: [getResource(MINICHARGE, 14), getResource(TAPE, 16), getResource(TOPAZ, 15)],
        characteristic: 95,
        place: madman,
        rarity: getRarityIcon(SECOND)
    },
    {
        icon: '💠',
        title: 'Алмазная броня',
        price: false,
        characteristic: 149,
        place: hexagon
    },
    {
        icon: 'Ⓜ️',
        title: 'Модульная броня',
        price: false,
        characteristic: 149,
        place: hexagon
    }
];

module.exports = {
    armors,
    armorsLongComment,
    armorsShortComment
};