import {characters, weapons} from 'genshin-db';
export const IMAGE_URL =
  'https://res.cloudinary.com/genshin/image/upload/sprites/';

export const sortedWeapons = () => {
  let arr = [];
  weapons('names', {matchCategories: true}).forEach(weapon => {
    arr.push(weapons(weapon));
  });

  return arr.sort((a, b) => parseInt(a.rarity) - parseInt(b.rarity));
};
