import {characters, weapons, domains, talents, materials} from 'genshin-db';
export const IMAGE_URL = 'https://res.cloudinary.com/genshin/image/upload/sprites/';

export const sortedWeapons = () => {
  let arr = [];
  weapons('names', {matchCategories: true}).forEach(weapon => {
    arr.push(weapons(weapon));
  });

  return arr.sort((a, b) => parseInt(a.rarity) - parseInt(b.rarity));
};

export const getTodayCharacter = (day, type) => {
  let chars = characters('names', {matchCategories: true});
  let wps = weapons('names', {matchCategories: true});

  let result = [
    {
      region: 'Mondstadt',
      domainEntrance: null,
      characters: [],
    },
    {
      region: 'Liyue',
      domainEntrance: null,
      characters: [],
    },
    {
      region: 'Inazuma',
      domainEntrance: null,
      characters: [],
    },
  ];
  let temp = [];
  if (type === 'Character') {
    let domainTalents = domains(day, {matchCategories: true}).filter(d => d.includes('Mastery'));
    domainTalents.forEach(d => {
      temp.push(d.substring(0, d.indexOf('I') - 1));
    });

    const set = new Set(temp);
    const cleaned_domains = Array.from(set.values());

    const talentMaterials = cleaned_domains.map(domain => {
      // console.log(domains('Realm of Slumber'));
      let name = domains(domain).rewardpreview[domains(domain).rewardpreview.length - 1].name;
      if (domain === 'Domain of Mastery: Altar of Flames' || domain === 'Domain of Mastery: Circle of Embers') {
        result[1] = {
          ...result[1],
          domainEntrance: domains(domain).domainentrance,
        };
      } else {
        if (domains(domain).region === 'Mondstadt') {
          result[0] = {
            ...result[0],
            domainEntrance: domains(domain).domainentrance,
          };
        } else if (domains(domain).region === 'Liyue') {
          result[1] = {
            ...result[1],
            domainEntrance: domains(domain).domainentrance,
          };
        } else if (domains(domain).region === 'Inazuma') {
          result[2] = {
            ...result[2],
            domainEntrance: domains(domain).domainentrance,
          };
        }
      }

      return name.split(' ')[2];
    });

    chars.forEach(char => {
      if (characters(char).region === 'Mondstadt') {
        if (talentMaterials.indexOf(talents(char).costs.lvl2[1].name.split(' ')[2]) !== -1) {
          result[0].characters.push(char);
        }
      } else if (characters(char).region === 'Liyue') {
        if (talentMaterials.indexOf(talents(char).costs.lvl2[1].name.split(' ')[2]) !== -1) {
          result[1].characters.push(char);
        }
      } else if (characters(char).region === 'Inazuma') {
        if (talentMaterials.indexOf(talents(char).costs.lvl2[1].name.split(' ')[2]) !== -1) {
          result[2].characters.push(char);
        }
        if (char === 'Kaedehara Kazuha') {
          if (talentMaterials.indexOf(talents(char).costs.lvl2[1].name.split(' ')[2]) !== -1) {
            result[1].characters.push(char);
          }
        }
      }
    });
  } else if (type === 'Weapon') {
    let todayMaterial = materials('weapon material', {
      matchCategories: true,
      verboseCategories: true,
    })
      .filter(el => el.rarity === '3')
      .filter(el => el.daysofweek.indexOf(day) !== -1);

    wps.forEach(wp => {
      let index = todayMaterial.map(el => el.name).indexOf(weapons(wp).costs.ascend2[1].name);
      if (index !== -1) {
        if (domains(todayMaterial[index].dropdomain).domainentrance === 'Cecilia Garden') {
          result[0].domainEntrance = domains(todayMaterial[index].dropdomain).domainentrance;
          result[0].characters.push(wp);
        }
        // else if (domains(todayMaterial[index].dropdomain).region === 'Liyue') {
        //   result[1].domainEntrance = domains(todayMaterial[index].dropdomain).domainentrance;
        //   result[1].characters.push(wp);
        // }
        else if (domains(todayMaterial[index].dropdomain).domainentrance === 'Court of Flowing Sand') {
          result[2].domainEntrance = domains(todayMaterial[index].dropdomain).domainentrance;
          result[2].characters.push(wp);
        } else if (domains(todayMaterial[index].dropdomain).domainentrance === 'Hidden Palace of Lianshan Formula') {
          result[1].domainEntrance = domains(todayMaterial[index].dropdomain).domainentrance;
          result[1].characters.push(wp);
        }
      }
    });
  }

  return result;
};
