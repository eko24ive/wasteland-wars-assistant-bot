const {
  regexps,
} = require('../regexp/regexp');


const parseRegularBeast = (beast) => {
  const splitted = beast.split('\n');
  let capsReceived = 0;
  let materialsReceived = 0;
  let fightResult = null;
  let type;

  const isDungeon = false;
  const [, distance] = regexps.campDistanceRegExp.exec(beast);
  const [, name] = regexps.beastNameRegExp.exec(beast);

  if (regexps.beastReceivedCapsRegExp.test(beast)) {
    [, capsReceived, materialsReceived] = regexps.beastReceivedCapsRegExp.exec(beast);
  }

  if (regexps.beastVictoryRegExp.test(beast)) {
    fightResult = 'win';
  } else {
    fightResult = 'lose';
  }

  if (regexps.darkZone.test(beast)) {
    type = 'DarkZone';
  } else {
    type = 'Regular';
  }

  const damagesReceived = splitted.map((row) => {
    if (regexps.beastAttackRegExp.test(row)) {
      const [, dmg] = regexps.beastAttackRegExp.exec(row);

      return Number(dmg);
    }

    return false;
  }).filter(dmg => dmg !== false);

  const droneDamagesGiven = splitted.map((row) => {
    if (regexps.droneBeastAttackRegExp.test(row)) {
      const [, dmg] = regexps.droneBeastAttackRegExp.exec(row);

      return Number(dmg);
    }

    return false;
  }).filter(dmg => dmg !== false);

  const damagesGiven = splitted.map((row) => {
    if (regexps.playerBeastAttackRegExp.test(row)) {
      const [, dmg] = regexps.playerBeastAttackRegExp.exec(row);

      return Number(dmg);
    }

    return false;
  }).filter(dmg => dmg !== false);

  const amountOfConcussions = splitted.map((row) => {
    if (regexps.beastStunRegExp.test(row)) {
      return true;
    }

    return false;
  }).filter(dmg => dmg !== false);

  const receivedItems = splitted.map((row) => {
    if (regexps.receivedItemRegExp.test(row)) {
      const [, item] = regexps.receivedItemRegExp.exec(row);

      return item;
    }

    return false;
  }).filter(item => item !== false);

  const [, negativePrefix, currentHealth, healthCap] = regexps.healthRegExp.exec(beast);

  return {
    distance: Number(distance),
    name,
    isDungeon,
    capsReceived: [Number(capsReceived)],
    materialsReceived: [Number(materialsReceived)],
    receivedItems,
    damagesReceived,
    damagesGiven: [
      ...damagesGiven,
      ...droneDamagesGiven,
    ],
    fightResult,
    currentHealth: Number(`${negativePrefix}${currentHealth}`),
    amountOfConcussions,
    meta: {
      healthCap: Number(healthCap),
    },
    type,
  };
};

const parseDungeonBeast = (beast) => {
  const splitted = beast.split('\n');

  const isDungeon = true;
  const [, distance] = regexps.campDistanceRegExp.exec(beast);
  const [, name] = regexps.beastNameRegExp.exec(beast);
  let fightResult;
  let type;

  const damagesReceived = splitted.map((row) => {
    if (regexps.beastAttackRegExp.test(row)) {
      const [, dmg] = regexps.beastAttackRegExp.exec(row);

      return Number(dmg);
    }

    return false;
  }).filter(dmg => dmg !== false);

  const damagesGiven = splitted.map((row) => {
    if (regexps.playerBeastAttackRegExp.test(row)) {
      const [, dmg] = regexps.playerBeastAttackRegExp.exec(row);

      return Number(dmg);
    }

    return false;
  }).filter(dmg => dmg !== false);

  const droneDamagesGiven = splitted.map((row) => {
    if (regexps.droneBeastAttackRegExp.test(row)) {
      const [, dmg] = regexps.droneBeastAttackRegExp.exec(row);

      return Number(dmg);
    }

    return false;
  }).filter(dmg => dmg !== false);

  const amountOfConcussions = splitted.map((row) => {
    if (regexps.beastStunRegExp.test(row)) {
      return true;
    }

    return false;
  }).filter(dmg => dmg !== false);

  if (regexps.beastVictoryRegExp.test(beast)) {
    fightResult = 'win';
  } else if (regexps.beastDefeatMaterialsLostRegExp.test(beast)) {
    fightResult = 'lose';
  }

  if (regexps.darkZone.test(beast)) {
    type = 'DarkZone';
  } else {
    type = 'Regular';
  }

  const [, , currentHealth, healthCap] = regexps.healthRegExp.exec(beast);

  return {
    distance: Number(distance),
    name,
    isDungeon,
    fightResult,
    capsReceived: 0,
    materialsReceived: 0,
    receivedItems: [],
    damagesReceived,
    damagesGiven: [
      ...damagesGiven,
      ...droneDamagesGiven,
    ],
    currentHealth,
    type,
    amountOfConcussions,
    meta: {
      healthCap: Number(healthCap),
    },
  };
};

module.exports = {
  parseRegularBeast,
  parseDungeonBeast,
};
