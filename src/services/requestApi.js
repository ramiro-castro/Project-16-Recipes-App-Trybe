// api de comida

export const ingredientFoodApi = async (ingrediente) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const data = await response.json();
  return data;
};

export const nameFoodApi = async (nome) => {
  console.log('nome', nome);
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
  const data = await response.json();
  return data;
};

// export const firstLetterFoodApi = async (primeiraletra) => {
//   const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraletra}`);
//   const data = await response.json();
//   return data;
// };

// api de bebidas

export const ingredientDrinkApi = async (ingrediente) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const data = await response.json();
  return data;
};

export const nameDrinkApi = async (nome) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`);
  const data = await response.json();
  return data;
};

// export const firstLetterDrinkApi = async (primeiraletra) => {
//   const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraletra}`);
//   const data = await response.json();
//   return data;
// };
