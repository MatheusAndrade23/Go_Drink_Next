export const IngredientsArray = (drink) => {
  const ingredients = [];
  const measures = [];

  for (let i = 1; i < 16; i++) {
    let ingredient = `strIngredient${i}`;

    if (drink[ingredient]) {
      ingredients.push(drink[ingredient]);
    }
  }

  for (let i = 1; i < 16; i++) {
    let measure = `strMeasure${i}`;

    if (drink[measure]) {
      measures.push(drink[measure]);
    }
  }

  if (ingredients.length == measures.length) {
    return { ingredients, measures };
  } else if (ingredients.length > measures.length) {
    for (let i = 0; i < ingredients.length - measures.length; i++) {
      measures.push('cubes');
    }
    return { ingredients, measures };
  }
};
