const _ = require('underscore');

const {
    helmets,
    helmetsComment
} = require('./helmet.js');

const {
    weapons,
    weaponsShortComment,
    weaponsLongComment
} = require('./weapon.js');

const {
    armors,
    armorsShortComment,
    armorsLongComment
} = require('./armor.js');

const meds = require('./meds.js');

const {
    RARITIES: {
        FIRST,
        SECOND
    },
    getRarityIcon
} = require('./resources.js');

const getItemIcon = icon => {
    if (icon) {
       return icon;
    }

   return '';
}

const getItemPrice = price => {
    if (price) {
       return price.join(', ');
    }

   return '???';
}

const getItemCharacteristic = characteristic => {
    if (characteristic) {
        return characteristic;
    }

    return '???';
}

const showItem = ({
    icon,
    title,
    characteristic,
    price
}, comment) => {
    var icon = getItemIcon(icon);
    var characteristic = getItemCharacteristic(characteristic);
    var price = getItemPrice(price);
    return `
${icon} *${title}*
${comment} ${characteristic}
💰: ${price}
`;
}

const showMed = ({
    icon,
    title,
    effect,
    characteristic,
    price,
    comment
}) => {
    var icon = getItemIcon(icon);
    var characteristic = getItemCharacteristic(characteristic);
    var price = getItemPrice(price);
    return `
${icon} *${title}*
${effect}${characteristic}
💰: ${price}${comment ? `\n${comment}` : ''}
`;
}

const showInvention = ({
    icon,
    title,
    rarity,
    characteristic,
    price
}, comment) => {
    var icon = getItemIcon(icon);
    var characteristic = getItemCharacteristic(characteristic);
    var price = getItemPrice(price);
    return `
${icon}${title} ${rarity}
(${characteristic}${comment}) - ${price}
`;
}

const showInventionWithoutTitle = ({
    rarity,
    characteristic,
    price
}, comment) => {
    var characteristic = getItemCharacteristic(characteristic);
    var price = getItemPrice(price);
    return `${rarity} (${characteristic}${comment}) - ${price}`;
}

const showItemsByPlace = (place, items, itemsComment) => {
    return items.filter(item => item.place === place && !!item.price && !item.rarity)
                .map(item => {
                    return showItem(item, itemsComment);
    }).join('');
};

const getItemByRarity = ({items, title, rarityIcon}) => {
    return items.filter(item => item.title === title && item.rarity === getRarityIcon(rarityIcon)).pop() || false;
}

const showItemsInventionsByPlace = (place, items, itemsComment) => {
    return items.filter(item => item.place === place && !!item.rarities)
                .map(invention => {
        const firstRarity = getItemByRarity({items, title: invention.title, rarityIcon: FIRST});
        const secondRarity = getItemByRarity({items, title: invention.title, rarityIcon: SECOND});
        
        return `${getItemIcon(invention.icon)} *${invention.title}* (${getItemCharacteristic(invention.characteristic)}${itemsComment})
${firstRarity ? showInventionWithoutTitle(firstRarity, itemsComment) : ''}
${secondRarity ? `${showInventionWithoutTitle(secondRarity, itemsComment)}\n` : ''}\n`;
    }).join('');
}

const getHelmetsByPlace = place => {
    return showItemsByPlace(place, helmets, helmetsComment)
};

const getWeaponsByPlace = place => {
    return showItemsByPlace(place, weapons, weaponsLongComment)
};

const getWeaponInventionsByPlace = place => {
    return showItemsInventionsByPlace(place, weapons, weaponsShortComment)
};

const getArmorsByPlace = place => {
    return showItemsByPlace(place, armors, armorsLongComment)
};

const getArmorInventionsByPlace = place => {
    return showItemsInventionsByPlace(place, armors, armorsShortComment)
};

const getMedsByPlace = place => {
    const itemsFromPlace = meds.filter(item => (item.place === place));
    return Object.keys(itemsFromPlace).map(item => {
        return showMed(itemsFromPlace[item]);
    }).join('');
};

module.exports = {
    getHelmetsByPlace,
    getWeaponsByPlace,
    getArmorsByPlace,
    getMedsByPlace,
    getWeaponInventionsByPlace,
    getArmorInventionsByPlace
};