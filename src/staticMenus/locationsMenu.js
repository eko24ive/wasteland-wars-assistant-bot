const locationsText = `
Здесь ты можешь просмотреть важные обычные и рейдовые локации в игре.
Нажми на кнопки внизу, что бы показать <b>🏜 Все локации</b> или <b>🤘 Рейдовые локации</b>
`;

const locationsAll = `
<b>[Квадратные]</b> скобки — важные игровые локации
<b>{Фигурные}</b> скобки — подземелья
<b>-Дефисы-</b> — гиганты

[8 км] 🧙‍♂ Безумный старик
{11км} ⛰ Старая шахта
[13км] ⚡️ Купол Грома
[15км] 🛤 Ореол
{19км} ⚠️ Пещера Ореола
{23км} 🚽 Сточная труба
-26км- 🗿 Радиоактив. Голем
[27км] 🏃🏿 Белое гетто
{29км} ⚙️ Открытое Убежище
[30км] 🕎 Ядро
{34км} 🦇 Бэт-пещера
-36км- 🤖 Киборг Анклава
{39км} 🦆 Перевал Уткина
[43км] 🚪 Уютный подвальчик
-44км- 👹 Повелитель Пустоши
{45км} 🌁 Высокий Хротгар
{50км} 🔴 Руины Гексагона
[51км] 🛏 Безопасный привал
-55км- ☠️ Киберкоготь
{56км} 🔬 Научный комплекс
-64км- 🐺 Яо-Гигант
{69км} ⛩ Храм Мудрости
{74км} 👁‍🗨 Чёрная Меза
`;

const locationsRaid = `
Каждый день проходит ТРИ рейда с промежутком в ВОСЕМЬ часов (по МСК):
<b>01:00</b> - <b>09:00</b> - <b>17:00</b>

▫️ <b>Старая фабрика</b>
    [5км] 📦Материалы
▫️ <b>Завод "Ядер-Кола"</b>
    [9км] 🕳Крышки
▫️ <b>Тюрьма</b>
    [12км] 💊Вещества
▫️ <b>Склады</b>
    [16км] 🍗Еда
▫️ <b>Датацентр</b>
    [20км] 🔹Кварц
▫️ <b>Госпиталь</b>
    [24км] ❤️Лечение
▫️ <b>Завод "Электрон"</b>
    [28км] 💡Генераторы
▫️ <b>Офисное здание</b>
    [32км] 💾Микрочипы
▫️ <b>Иридиевые шахты</b>
    [38км] 🔩Иридий
▫️ <b>Склад металла</b>
    [46км] 🔗Кубонит
`;


const locationsDungeon = `
{11км}<b> ⛰ Старая шахта</b>

{19км}<b> ⚠️ Пещера Ореола</b>

{23км}<b> 🚽 Сточная труба</b>

{29км}<b> ⚙️ Открытое Убежище</b>

{34км}<b> 🦇 Бэт-пещера</b>

{39км}<b> 🦆 Перевал Уткина</b>

{45км}<b> 🌁 Высокий Хротгар</b>

{50км}<b> 🔴 Руины Гексагона</b>

{56км}<b> 🔬 Научный комплекс</b>

{69км}<b> ⛩ Храм Мудрости</b>

{74км}<b> 👁‍🗨 Чёрная Меза</b>
`;

const locationsMenu = {
    config: {
        parseMode: 'html'
    },
    name: 'locations',
    title: 'Локации',
    text: locationsText,
    content: [{
            name: 'locationsAll',
            title: '🏜 Все',
            text: locationsAll,
            content: []
        },
        {
            name: 'locationsRaid',
            title: '🤘 Рейдовые',
            text: locationsRaid,
            content: []
        },
        {
            name: 'locationsDungeon',
            title: '⚠️Подземелья',
            text: locationsDungeon,
            content: []
        }
    ]
};

module.exports = locationsMenu;