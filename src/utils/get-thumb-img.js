import { db } from '../services/api';

export const GetThumbImg = async (kind, kinds, type) => {
  let imgLinks = [];
  let errors = [];

  for (let i = 0; i < kinds.length; i++) {
    try {
      const resp = await db.get(
        `/api/json/v1/1/filter.php?${kind}=${kinds[i][type]}`,
      );
      const array = resp.data.drinks.reverse();
      const img = array[0].strDrinkThumb;
      imgLinks.push(img);
    } catch (error) {
      errors.push(error);
    }
  }
  return imgLinks;
};
