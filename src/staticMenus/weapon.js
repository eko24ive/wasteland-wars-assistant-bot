const {
    merchant,
    engineer,
    workbench,
    core,
    basement
} = require('./places.js');

const weaponsComment = '💪Урон: +';
const weapons = [
    {
        icon: false,
        title: "Бейсбольная бита",
        price: { caps: 30, },
        characteristic: 1,
        place: merchant
    },
    {
        icon: false,
        title: "Ржавый нож",
        price: { caps: 30, },
        characteristic: 3,
        place: merchant
    },
    {
        icon: false,
        title: "Разводной ключ",
        price: { caps: 30, },
        characteristic: 5,
        place: merchant
    },
    {
        icon: false,
        title: "Топор",
        price: { caps: 30, },
        characteristic: 7,
        place: merchant
    },
    {
        icon: false,
        title: "Кинжал",
        price: { caps: 30, },
        characteristic: 9,
        place: merchant
    },
    {
        icon: false,
        title: "Мачете",
        price: { caps: 30, },
        characteristic: 11,
        place: merchant
    },
    {
        icon: false,
        title: "Хлыст",
        price: { caps: 30, },
        characteristic: 13,
        place: merchant
    },
    {
        icon: false,
        title: "Стальная бита",
        price: { caps: 30, },
        characteristic: 16,
        place: merchant
    },
    {
        icon: "⚡",
        title: "Прочная бита",
        price: { materials: 200, },
        characteristic: 2,
        place: workbench
    },
    {
        icon: "⚡",
        title: "Копье",
        price: { materials: 600, },
        characteristic: 4,
        place: workbench
    },
    {
        icon: "⚡",
        title: "Кистень",
        price: { materials: 1300, },
        characteristic: 6,
        place: workbench
    },
    {
        icon: "⚡",
        title: "Электромеч",
        price: { materials: 3900, },
        characteristic: 9,
        place: workbench
    },
    {
        icon: "💥",
        title: "Лазерный тесак",
        price: {
            materials: 5600,
            quartz: 4,
        },
        characteristic: 12,
        place: workbench
    },
    {
        icon: "💥",
        title: "BFGzzv-4000",
        price: {
            materials: 12000,
            quartz: 30,
        },
        characteristic: 20,
        place: workbench
    },
    {
        icon: "💥",
        title: "BFGzzv-4000",
        price: {
            materials: 12000,
            quartz: 30,
        },
        characteristic: 20,
        place: workbench
    },
    {
        icon: "🔗",
        title: "Силовой кастет",
        price: {
            materials: 14000,
            quartz: 20,
            generators: 5,
        },
        characteristic: 25,
        place: workbench
    },
    {
        icon: "💥",
        title: "Колыбель Пустоши",
        price: {
            materials: 19990,
            quartz: 35,
            generators: 5,
        },
        characteristic: 29,
        place: workbench
    },
    {
        icon: "💥",
        title: "Tyrant-PDR",
        price: {
            materials: 29990,
            quartz: 60,
            generators: 25,
        },
        characteristic: 38,
        place: workbench
    },
    {
        icon: "☄️",
        title: "Огнемёд",
        price: {
            materials: 45900,
            quartz: 90,
            generators: 75,
            microchip: 5,
        },
        characteristic: 49,
        place: workbench
    },
    {
        icon: "☄",
        title: "️Больверизатор",
        price: {
            materials: 59990,
            quartz: 100,
            generators: 90,
            microchip: 45,
        },
        characteristic: 56,
        place: workbench
    },
    {
        icon: "🔮",
        title: "Энергосфера",
        price: {
            materials: 78990,
            generators: 120,
            microchip: 60,
            iridium: 20,
        },
        characteristic: 65,
        place: workbench
    },
    {
        icon: "🌟",
        title: "Армагеддец",
        price: {
            materials: 129990,
            generators: 150,
            microchip: 70,
            iridium: 40,
        },
        characteristic: 79,
        place: workbench
    },
    {
        icon: "☣️",
        title: "Потрошитель",
        price: {
            materials: 158990,
            generators: 220,
            microchip: 99,
            iridium: 88,
        },
        characteristic: 92,
        place: engineer
    },
    {
        icon: "☣️",
        title: "Жиробас",
        price: {
            materials: 191000,
            generators: 250,
            microchip: 135,
            iridium: 112,
        },
        characteristic: 125,
        place: engineer
    },
    {
        icon: "🌟",
        title: "Гравипушка",
        price: {
            materials: 241900,
            generators: 310,
            microchip: 185,
            iridium: 145,
        },
        characteristic: 159,
        place: engineer
    },
    {
        icon: "💿",
        title: "DVD-VCH",
        price: {
            materials: 269000,
            generators: 330,
            microchip: 200,
            iridium: 180,
        },
        characteristic: 187,
        place: engineer
    },
    {
        icon: "♻️",
        title: "Рандомган",
        price: {
            materials: 281300,
            generators: 350,
            microchip: 223,
            iridium: 197,
        },
        characteristic: 206,
        place: engineer
    },
    {
        icon: "🐱",
        title: "Ракетенок☄",
        price: {
            materials: 349900,
            generators: 410,
            microchip: 299,
            iridium: 250,
        },
        characteristic: 266,
        place: engineer
    },
    {
        icon: "✳️",
        title: "Протонный топор",
        price: {
            materials: 359900,
            quartz: 2990,
            microchip: 289,
            iridium: 275,
        },
        characteristic: false,
        place: core
    },
    {
        icon: "❇️",
        title: "Плазмакастер",
        price: {
            materials: 349900,
            generators: 410,
            microchip: 359,
            iridium: 310,
        },
        characteristic: 291,
        place: core
    },
    {
        icon: "💣",
        title: "Судный день",
        price: {
            materials: 325900,
            generators: 680,
            microchip: 399,
            iridium: 390,
        },
        characteristic: false,
        place: core
    },
    {
        icon: "💥",
        title: "Маленький друг",
        price: {
            materials: 399400,
            generators: 750,
            microchip: 435,
            iridium: 329,
        },
        characteristic: 325,
        place: core
    },
    {
        icon: "🧠",
        title: "Брейналайзер",
        price: {
            materials: 656900,
            cubonite: 38990,
        },
        characteristic: 344,
        place: basement
    },
    {
        icon: "🌡",
        title: "Плюмбус",
        price: {
            materials: 957900,
            cubonite: 54990,
            osmium: 30290,
        },
        characteristic: 416,
        place: basement
    },
    {
        icon: "💢",
        title: "Плазмолив",
        price: {
            materials: 1135900,
            cubonite: 68490,
            osmium: 45590,
            titanium: 43930,
        },
        characteristic: false,
        place: basement
    },
    {
        icon: "❇️",
        title: "γ-Дезинтегратор",
        price: {
            materials: 1426900,
            cubonite: 99990,
            osmium: 79560,
            titanium: 66980,
        },
        characteristic: 507,
        place: basement
    }
];

module.exports = {
    weapons,
    weaponsComment
};