const numeral = require('numeral');

const constants = require('./constants/constants');
const defaultSkillCost = require('./constants/defaultSkillCost');
const defaultCharismaCost = require('./constants/defaultCharismaCost');
const dzenCost = require('./constants/dzenConst');
const mobs = require('./constants/mobs');
const mobsRanges = require('./constants/mobsRanges');
const timeToTravel = require('./utils/timeToTravel');
const skillsCap = require('./constants/skillCap');
const skillMap = require('./constants/skillMap');

const formatNubmer = (number) => {
  const floored = Math.floor(number);

  return numeral(floored).format('0,0');
};

const calculatePerkDiscount = (charismaLevel) => {
  if (charismaLevel >= 2) {
    return (charismaLevel - 1) * constants.charismaSkillAffection;
  }

  return 0;
};

const amountToSpend = (
  skillToUpgrade,
  charismaLevel,
  skillRangeFrom,
  skillRangeTo,
) => {
  const discount = calculatePerkDiscount(charismaLevel);
  const skill = skillMap[skillToUpgrade];

  const skillCost = skill === 'charisma' ? defaultCharismaCost : defaultSkillCost;

  const skillCostWithDiscount = skillCost.map((level) => {
    const costWithDiscount = level.caps - discount;
    if (costWithDiscount < 10) {
      return 10;
    }

    return costWithDiscount;
  }).slice(skillRangeFrom, skillRangeTo);

  const skillCostWithoutDiscount = skillCost.slice(skillRangeFrom, skillRangeTo).map(level => level.caps).reduce((a, b) => a + b);

  const sum = skillCostWithDiscount.reduce((a, b) => a + b);

  return skill === 'charisma' ? skillCostWithoutDiscount : sum;
};

/* const skillCostWithDiscount = (
    charismaLevel,
    skillRangeFrom,
    skillRangeTo
) => {
    const slicedSkillCostWithDiscount = defaultSkillCost.map(skill => {
        const discount = calculatePerkDiscount(charismaLevel);

        const costWithDiscount = skill.caps - discount;
        if (costWithDiscount < 10) {
            return {
                level: skill.level,
                caps: 10
            };
        }

        return {
            level: skill.level,
            caps: costWithDiscount
        };
    }).slice(skillRangeFrom, skillRangeTo);

    const lowcost = slicedSkillCostWithDiscount.filter(skill => skill.caps === 10);

    if (lowcost.length > 0) {
        return [
            {
                level: `${lowcost[0].level} - ${lowcost.pop().level}`,
                caps: 10
            },
            ...slicedSkillCostWithDiscount.filter(skill => skill.caps !== 10),
        ]
    }

    return slicedSkillCostWithDiscount;
} */


const calculateAmountOfRaids = (
  reachableDistance,
  charismaLevel,
  skillRangeFrom,
  skillRangeTo,
  upgradeSkill,
  additionalCaps,
) => {
  const distanceOfRanges = {};
  const mobsFillment = [];

  const totalSpend = amountToSpend(
    upgradeSkill,
    charismaLevel,
    skillRangeFrom,
    skillRangeTo,
  ) + additionalCaps;

  if (totalSpend === null) {
    return null;
  }

  const scopeOfRanges = mobsRanges.filter((range) => {
    const [start, end] = range.split('-');

    return Number(end) <= Number(reachableDistance) || Number(reachableDistance) >= Number(start);
  });

  scopeOfRanges.forEach((range) => {
    const [start, end] = range.split('-');

    distanceOfRanges[range] = end - start;
  });

  const getRandomItem = array => array[Math.floor(Math.random() * array.length)];

  scopeOfRanges.forEach((range) => {
    const distanceOfRange = distanceOfRanges[range];
    const amountOfIterations = distanceOfRange < 2 ? distanceOfRange : Math.floor(Math.random() * 2) + 1;
    const mobsForRange = mobs[range];

    // FIXME: Might be cause of skillupgrade issue;
    for (let i = amountOfIterations; i > 0; i -= 1) {
      const item = getRandomItem(mobsForRange);
      mobsFillment.push(item);
    }
  });

  const bestCaseScenario = {
    caps: mobsFillment.map(mob => mob.capsMax).reduce((a, b) => Number(a) + Number(b)),
    res: mobsFillment.map(mob => mob.resMax).reduce((a, b) => Number(a) + Number(b)),
  };

  const worstCaseScenario = {
    caps: mobsFillment.map(mob => mob.capsMin).reduce((a, b) => Number(a) + Number(b)),
    res: mobsFillment.map(mob => mob.resMin).reduce((a, b) => Number(a) + Number(b)),
  };

  return {
    bestCaseScenario: {
      ...bestCaseScenario,
      convertedCaps: bestCaseScenario.res / 10,
      amountOfRaids: totalSpend / (bestCaseScenario.res / 10 + bestCaseScenario.caps),
    },
    worstCaseScenario: {
      ...worstCaseScenario,
      convertedCaps: worstCaseScenario.res / 10,
      amountOfRaids: totalSpend / (worstCaseScenario.res / 10 + worstCaseScenario.caps),
    },
  };
};

const calculateAmountSpentOnCharisma = (
  charismaLevel,
) => {
  if (charismaLevel === '' || charismaLevel === 0) {
    return null;
  }

  const spentAmount = defaultCharismaCost.filter(c => c.level <= charismaLevel)
    .map(c => c.caps)
    .reduce((a, b) => a + b);

  return spentAmount;
};

const calculateSpentOnSkill = (
  skillLevel,
) => {
  const spentAmount = defaultSkillCost.filter(c => c.level <= skillLevel)
    .map(c => c.caps)
    .reduce((a, b) => a + b);

  return spentAmount;
};

const getCap = ({
  upgradeSkill,
  currentSkillLevel,
  amountToUpgrade,
  dzenAmount,
  toMax,
  currentDzen,
}) => {
  const skillName = skillMap[upgradeSkill];

  let upgradeTo = Number(currentSkillLevel) + Number(amountToUpgrade);
  let skillCap = skillsCap[skillName];

  if (toMax) {
    if (currentDzen === 0 || currentDzen === undefined) {
      return skillCap;
    }

    return skillCap + currentDzen * constants.DZEN_MODIFIER;
  }

  if (dzenAmount) {
    skillCap += dzenAmount * constants.DZEN_MODIFIER;
    upgradeTo = skillCap;
  }

  if (upgradeTo < skillCap && upgradeTo < constants.AVAILABLE_CAP && !dzenAmount) {
    return upgradeTo;
  }

  if (upgradeTo > skillCap && upgradeTo < constants.AVAILABLE_CAP) {
    return upgradeTo;
  }

  return skillCap;
};

const calculateUpgrade = ({
  pip,
  upgradeSkill,
  amountToUpgrade,
  reachableKm,
}, {
  toMax,
  currentDzen,
  dzenAmount,
}) => {
  const currentSkillLevel = pip[skillMap[upgradeSkill]];
  const upgradeTo = getCap({
    upgradeSkill,
    currentSkillLevel,
    amountToUpgrade,
    toMax,
    dzenAmount,
    currentDzen,
  });
  const charismaLevel = Number(pip.charisma);
  const reachableDistance = Number(/\d*/.exec(reachableKm).pop());
  const skillName = skillMap[upgradeSkill];
  const skillCap = skillsCap[skillName];
  let dzenApplied = dzenAmount;
  let additionalCaps = 0;

  if (upgradeTo >= constants.AVAILABLE_CAP) {
    return 'Ух, я до таких показателей считать ещё не умею, прости :с';
  }

  if (!dzenAmount && upgradeTo > skillCap && upgradeTo < constants.AVAILABLE_CAP) {
    if ((upgradeTo - skillCap) - currentDzen * 50 > 0) {
      dzenApplied = Math.ceil((upgradeTo - skillCap) / 50);
    }
  }

  if (dzenApplied) {
    additionalCaps = dzenCost
      .filter(({
        level,
      }) => level > currentDzen && level <= dzenApplied)
      .map(level => level.caps).reduce((a, b) => a + b);
  }

  const calculations = {
    amountOfSavedFunds: amountToSpend(
      upgradeSkill,
      1,
      currentSkillLevel,
      upgradeTo,
    ) - amountToSpend(
      upgradeSkill,
      charismaLevel,
      currentSkillLevel,
      upgradeTo,
    ),
    amountToSpend: amountToSpend(
      upgradeSkill,
      charismaLevel,
      currentSkillLevel,
      upgradeTo,
    ),
    raidsInfo: calculateAmountOfRaids(
      reachableDistance,
      charismaLevel,
      currentSkillLevel,
      upgradeTo,
      upgradeSkill,
      additionalCaps,
    ),
    amountSpentOnCharisma: calculateAmountSpentOnCharisma(charismaLevel),
  };

  const spentOnSkill = calculateSpentOnSkill(currentSkillLevel);

  const raidsAmount = Math.floor(calculations.raidsInfo.worstCaseScenario.amountOfRaids);
  const timeToFarm = Math.floor((timeToTravel(pip.endurance, reachableDistance) * raidsAmount) / 60 / 60);

  const displayTimeToFarm = timeToFarm === 0 ? (timeToTravel(pip.endurance, reachableDistance) * raidsAmount).toFixed(2) : timeToFarm;

  const dzenText = dzenApplied ? `\n🏵 *Дзен*:\n + ${formatNubmer(additionalCaps)} 🕳 крышек для прокачки дзена с ${currentDzen} уровня до ${dzenApplied} уровня` : '';
  const totalText = dzenApplied ? `\n\nВсего: *${formatNubmer(calculations.amountToSpend + additionalCaps)}* 🕳 крышек для прокачки скила и Дзена` : '';
  /*
    При самом удачном стечении обсоятельств тебе необходимо сделать примерно ${Math.ceil(calculations.raidsInfo.bestCaseScenario.amountOfRaids)} 👣 ходок:
За одну ходку ты получишь примерно:
- ${formatNubmer(calculations.raidsInfo.bestCaseScenario.caps)} 🕳 крышек
- ${formatNubmer(calculations.raidsInfo.bestCaseScenario.res)} 📦 материалов

Если сбагрить материалы в ломбарде то суммарная выручка за ${Math.floor(calculations.raidsInfo.bestCaseScenario.amountOfRaids)} ходки с учётом крышек будет ${formatNubmer((calculations.raidsInfo.bestCaseScenario.convertedCaps + calculations.raidsInfo.bestCaseScenario.caps) * calculations.raidsInfo.bestCaseScenario.amountOfRaids)} 🕳 крышек

*/

  /* _Забавный факт #1: ты потратил на харизму ${formatNubmer(calculations.amountSpentOnCharisma)} 🕳 крышек_ */
  /* Твой текущий уровень харизмы позволил сэкономить ${formatNubmer(calculations.amountOfSavedFunds)} 🕳 крышек. */
  const res = `
_Всего ты потратил ${formatNubmer(spentOnSkill)} 🕳 крышек на ${upgradeSkill}_

Необходимо потратить ${formatNubmer(calculations.amountToSpend)} 🕳 крышек для прокачки навыка \`${upgradeSkill}\` от ${currentSkillLevel} уровня до ${upgradeTo} уровня
${dzenText}${totalText}

Тебе необходимо сделать примерно *${raidsAmount || '<1'} 👣 ходок*.

${raidsAmount > 0 ? `C твоей 🔋Выносливостью на это потребуётся примерно ${displayTimeToFarm} часов.
_Без учёта рейдов, игровых событий, лагов, солнечных затмений и прочей хуйни_` : ''}


\`Из-за недавнего обновления Wasteland Wars данные для расчёта ходок работают в эксперементальном режиме\`
`;
  /*
За одну ходку ты получишь примерно:
- ${formatNubmer(calculations.raidsInfo.worstCaseScenario.caps)} 🕳 крышек
- ${formatNubmer(calculations.raidsInfo.worstCaseScenario.res)} 📦 материалов

Если сбагрить материалы в ломбарде то суммарная выручка за ${Math.floor(calculations.raidsInfo.worstCaseScenario.amountOfRaids)} ходки с учётом крышек будет *${formatNubmer((calculations.raidsInfo.worstCaseScenario.convertedCaps + calculations.raidsInfo.worstCaseScenario.caps) * calculations.raidsInfo.worstCaseScenario.amountOfRaids)} 🕳 крышек* */

  return res;
};

module.exports = calculateUpgrade;
